import { fetchAllCountries } from '../../api/covid';

const container = document.querySelector('.countries');
const title = document.createElement('h4');
title.innerText = 'Countries';
const list = document.createElement('ul');
container.append(title);
container.append(list);

let countriesList = [];
const handleRenderingAllCountriesList = () => {
  fetch(fetchAllCountries).then((response) => response.json()).then((data) => {
    countriesList = data.map((item) => item);
    countriesList.map((item) => {
      const country = document.createElement('li');
      country.innerText = item.Country;
      list.append(country);
      return item;
    });
  });
};

export default handleRenderingAllCountriesList;
