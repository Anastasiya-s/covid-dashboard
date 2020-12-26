import L from 'leaflet';

const mapContainer = document.querySelector('.map');
const mapOptions = {
  center: [17.385044, 78.486671],
  zoom: 1,
};
const map = L.map(mapContainer, mapOptions);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const countryArr = [];

const setMarkers = () => {
  const maxCase = countryArr[0].cases;
  let color = '';
  countryArr.forEach((el) => {
    const markerOptions = {
      title: 'MyLocation',
      alt: 'Hello',
      clickable: true,
      draggable: false,
    };

    if ((el.cases * 100) / maxCase < 25) color = 'green';
    if ((el.cases * 100) / maxCase > 25 && (el.cases * 100) / maxCase < 40) color = 'yellow';
    if ((el.cases * 100) / maxCase > 40) color = 'red';

    const iconHtml = `<div style="width: 20px; height: 20px; border-radius: 50%; border:10px solid ${color}; text-align: center;"></div>`;

    const myIcon = L.divIcon({
      className: 'my-div-icon',
      html: iconHtml,
    });

    const marker = new L.Marker([el.countryInfo.lat, el.countryInfo.long], { icon: myIcon });
    marker.addTo(map);
    marker.addEventListener('mouseover', () => { marker.bindPopup(`${el.cases}`).openPopup(); });
    marker.addEventListener('click', () => {
      listOfParametrs(el);
      drawChart(el.countryInfo.iso3);
    }, false);
  });
};

fetch('https://disease.sh/v3/covid-19/countries?sort=cases')
  .then((result) => {
    setMarkers();
  })
  .catch((error) => console.log('error', error));

