import '../styles/main.scss';

import handleRenderingAllCountriesList from './countries-list/countriesList';

let countriesList = [];
let countriesActiveProp = 'cases';
let isRelative = false;

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
  handleRenderingAllCountriesList(countriesList, param, isRelative);
  return countriesList;
};

document.addEventListener('DOMContentLoaded', () => {
  const dataParams = document.querySelectorAll('.data-panel');
  handleFetchingData(countriesActiveProp);
  dataParams.forEach((item) => item.addEventListener('click', (e) => {
    countriesActiveProp = e.target.dataset.info;
    handleFetchingData(countriesActiveProp);
  }));
  const relativeButton = document.querySelector('.relative');
  const absoluteButton = document.querySelector('.absolute');
  relativeButton.addEventListener('click', () => {
    isRelative = true;
    handleFetchingData(countriesActiveProp);
  });
  absoluteButton.addEventListener('click', () => {
    isRelative = false;
    handleFetchingData(countriesActiveProp);
  });
});
