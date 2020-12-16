// import { fetchAllCountries } from '../../api/covid';

const container = document.querySelector('.countries');
const title = document.createElement('h4');
title.innerText = 'Countries';
const list = document.createElement('ul');
container.append(title);
container.append(list);

const handleRenderingAllCountriesList = (countriesList, countriesActiveProp) => {
  const countries = countriesList;
  countries.forEach((item) => {
    const key = item.country;
    const value = item[countriesActiveProp];
    const countryContainer = document.createElement('li');
    const keySpan = document.createElement('span');
    keySpan.innerText = key;
    const valueSpan = document.createElement('span');
    valueSpan.innerText = value;
    countryContainer.append(keySpan, valueSpan);
    list.append(countryContainer);
  });
};

export default handleRenderingAllCountriesList;
