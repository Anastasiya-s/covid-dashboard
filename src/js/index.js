import '../styles/main.scss';

import handleRenderingAllCountriesList from './countries-list/countriesList';
import renderDetails from './details-table/details';
import resize from './helpers/fullscreen';

let countriesList = [];
let countriesActiveProp = 'cases';
let isRelativeList = false;
let currentCountry = 'global';
let isRelativeDetails = false;
let detailsTime = 'total';

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
  renderDetails(currentCountry, d, isRelativeDetails);
};

document.addEventListener('DOMContentLoaded', () => {
  const dataParams = document.querySelectorAll('.data-panel');
  const countries = document.querySelectorAll('.countries-list');
  const resizeButtons = document.querySelectorAll('.button-resize');
  fetchCountryData(currentCountry, detailsTime);
  handleFetchingData(countriesActiveProp);
  dataParams.forEach((item) => item.addEventListener('click', (e) => {
    countriesActiveProp = e.target.dataset.info;
    handleFetchingData(countriesActiveProp);
  }));
  countries.forEach((item) => {
    item.addEventListener('click', (e) => {
      currentCountry = e.target.dataset.country || e.target.parentNode.dataset.country;
      fetchCountryData(currentCountry, detailsTime);
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
});
