import '../styles/main.scss';
import L from 'leaflet';

import handleRenderingAllCountriesList from './countries-list/countriesList';
import renderDetails from './details-table/details';
import resize from './helpers/fullscreen';
import drawDiagram from './diagram/diagram';
import handleSearch from './search-panel/search-panel';
import Keyboard from './keyboard/Keyboard';
import {
  handleSpecialKeys,
  addSymbol,
  // removeSymbol,
  audio,
} from './keyboard/helpers';

const keyboard = new Keyboard();
const specialKeysCode = [
  'Backquote',
  'Backspace',
  'Tab',
  'CapsLock',
  'ShiftRight',
  'ShiftLeft',
  'ControlLeft',
  'ControlRight',
  'AltLeft',
  'AltRight',
  'Space',
  'Enter',
  'Menu',
  'Backspace',
  'ChangeLang',
  'Sound',
];

let countriesList = [];
let countriesActiveProp = 'cases';
let isRelativeList = false;
let currentCountry = 'global';
let isRelativeDetails = false;
let detailsTime = 'total';
const mapProp = 'cases';

const handleFetchingData = async (currentParam) => {
  const param = currentParam;
  const response = await fetch(`https://disease.sh/v3/covid-19/countries?yesterday=true&sort=${currentParam}&allowNull=true`);
  const data = await response.json();
  countriesList = data.map((country) => {
    const item = {
      country: country.country,
      flag: country.countryInfo.flag,
      [param]: country[param],
      population: country.population,
    };
    return item;
  });
  handleRenderingAllCountriesList(countriesList, param, isRelativeList);
  return countriesList;
};

const fetchCountryData = async (c, t) => {
  const country = c;
  const time = t;
  let d;
  if (!country) return;
  if (country === 'global') {
    const response = await fetch('https://disease.sh/v3/covid-19/all?yesterday=true');
    const data = await response.json();
    d = {
      cases: time === 'total' ? data.cases : data.todayCases,
      deaths: time === 'total' ? data.deaths : data.todayDeaths,
      recovered: time === 'total' ? data.recovered : data.todayRecovered,
      population: data.population,
    };
  } else {
    const response = await fetch(`https://disease.sh/v3/covid-19/countries/${c}?yesterday=true&twoDaysAgo=true&strict=true`);
    const data = await response.json();
    d = {
      cases: time === 'total' ? data.cases : data.todayCases,
      deaths: time === 'total' ? data.deaths : data.todayDeaths,
      recovered: time === 'total' ? data.recovered : data.todayRecovered,
      population: data.population,
    };
  }
  renderDetails(country, d, isRelativeDetails);
};

// Map Leaflet

const mapContainer = document.querySelector('.map');
const mapOptions = {
  center: [17.385044, 78.486671],
  zoom: 2,
};
const map = L.map(mapContainer, mapOptions);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const getMarkers = async () => {
  const response = await fetch(`https://disease.sh/v3/covid-19/countries?yesterday=true&sort=${mapProp}&allowNull=true`);
  const data = await response.json();
  const iconHtml = '<div class="map-pin"></div>';
  data.forEach((country) => {
    const icon = L.divIcon({
      html: iconHtml,
    });
    const marker = new L.Marker([country.countryInfo.lat, country.countryInfo.long], { icon });
    marker.addTo(map);
    marker.addEventListener('mouseover', () => { marker.bindPopup(`${country.country} ${country[mapProp]}`).openPopup(); });
    marker.addEventListener('click', () => {
      currentCountry = country.country;
      fetchCountryData(country.country, detailsTime);
    });
  });
};

const handleSearchSubmit = (v) => {
  const value = v;
  const options = document.querySelectorAll('.countries-item');
  const searchBar = document.querySelector('.search-input');
  options.forEach((option) => {
    const item = option;
    if (option.dataset.country.toLowerCase() === value) {
      fetchCountryData(value, 'total');
      searchBar.value = '';
    }
    item.style.display = 'flex';
  });
};

// map end

document.addEventListener('DOMContentLoaded', () => {
  const dataParams = document.querySelectorAll('.data-panel');
  const countries = document.querySelectorAll('.countries-list');
  const resizeButtons = document.querySelectorAll('.button-resize');
  const keyboardOpenButton = document.querySelector('.keyboard-toggler');
  const textArea = document.querySelector('.search-input');
  const keyboardContainer = document.querySelector('.keyboard-container');
  const searchBar = document.querySelector('.search-input');
  const submitButton = document.querySelector('.search-submit');
  submitButton.addEventListener('click', () => {
    const span = document.querySelector('.button-text');
    const c = searchBar.value;
    handleSearchSubmit(c);
    while (keyboardContainer.firstChild) {
      keyboardContainer.removeChild(keyboardContainer.firstChild);
    }
    keyboard.isOpen = false;
    span.innerText = 'Open keyboard';
  });
  searchBar.addEventListener('keyup', (e) => {
    const char = e.key;
    handleSearch(char);
  });
  fetchCountryData(currentCountry, detailsTime);
  handleFetchingData(countriesActiveProp);
  getMarkers(mapProp);
  drawDiagram(currentCountry, countriesActiveProp);
  dataParams.forEach((item) => item.addEventListener('click', (e) => {
    countriesActiveProp = e.target.dataset.info;
    handleFetchingData(countriesActiveProp);
    if (countriesActiveProp === 'cases' || countriesActiveProp === 'deaths' || countriesActiveProp === 'recovered') {
      drawDiagram(currentCountry, countriesActiveProp);
    }
  }));
  countries.forEach((item) => {
    item.addEventListener('click', (e) => {
      currentCountry = e.target.dataset.country || e.target.parentNode.dataset.country;
      fetchCountryData(currentCountry, detailsTime);
      drawDiagram(currentCountry, countriesActiveProp);
    });
  });
  const relativeButton = document.querySelector('.relative');
  const absoluteButton = document.querySelector('.absolute');
  relativeButton.addEventListener('click', () => {
    isRelativeList = true;
    handleFetchingData(countriesActiveProp);
  });
  absoluteButton.addEventListener('click', () => {
    isRelativeList = false;
    handleFetchingData(countriesActiveProp);
  });
  const relativeDetailsButton = document.querySelector('#relative-details');
  const absoluteDetailsButton = document.querySelector('#absolute-details');
  const totalDetailsButton = document.querySelector('#total-details');
  const dailyDetailsButton = document.querySelector('#daily-details');
  relativeDetailsButton.addEventListener('click', () => {
    isRelativeDetails = true;
    fetchCountryData(currentCountry, detailsTime);
  });
  absoluteDetailsButton.addEventListener('click', () => {
    isRelativeDetails = false;
    fetchCountryData(currentCountry, detailsTime);
  });
  totalDetailsButton.addEventListener('click', () => {
    detailsTime = 'total';
    fetchCountryData(currentCountry, detailsTime);
  });
  dailyDetailsButton.addEventListener('click', () => {
    detailsTime = 'daily';
    fetchCountryData(currentCountry, detailsTime);
  });
  resizeButtons.forEach((button) => {
    button.addEventListener('click', (e) => resize(e));
  });

  // keyboard

  keyboardOpenButton.addEventListener('click', () => {
    const span = document.querySelector('.button-text');
    if (keyboard.isOpen) {
      while (keyboardContainer.firstChild) {
        keyboardContainer.removeChild(keyboardContainer.firstChild);
      }
      keyboard.isOpen = false;
      span.innerText = 'Open keyboard';
      textArea.focus();
    } else {
      keyboard.init();
      span.innerText = 'Close keyboard';
      textArea.focus();
    }
  });

  keyboardContainer.addEventListener('click', (e) => {
    const { keyCode } = e.target.dataset;
    const { lang } = keyboard;
    const audioFilePath = `./assets/sounds/key_${lang}.mp3`;
    audio.src = audioFilePath;
    if (!keyCode) {
      return;
    }
    if (specialKeysCode.includes(keyCode)) {
      handleSpecialKeys(keyCode, keyboard);
    } else {
      addSymbol(keyCode, keyboard, textArea);
      if (keyboard.isShiftPressed) {
        keyboard.isShiftPressed = false;
        keyboard.changeKeyboardLayout();
      }
      handleSearch(keyCode);
    }
    if (keyboard.isSoundOn) audio.play();
    textArea.focus();
    textArea.selectionStart = textArea.value.length;
  });

  // document.addEventListener('keydown', (e) => {
  //   const keyCode = e.code;
  //   const button = document.querySelector(`.${keyCode}`);
  //   if (button) {
  //     if (keyCode === 'CapsLock') {
  //       button.classList.toggle('active');
  //     }
  //     button.classList.add('blur');
  //   }
  // });

  // document.addEventListener('keyup', (e) => {
  //   const keyCode = e.code;
  //   const button = document.querySelector(`.${keyCode}`);
  //   button.classList.remove('blur');
  //   textArea.focus();
  //   textArea.selectionStart = textArea.value.length;
  // });

  // textArea.addEventListener('click', (e) => {
  //   textArea.setSelectionRange(e.offsetX, e.offsetX);
  // });

  // keyboard end
});
