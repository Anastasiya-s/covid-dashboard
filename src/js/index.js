import '../styles/main.scss';

import { fetchSummary } from '../api/covid';
import handleRenderingAllCountriesList from './countries-list/countriesList';

let countriesList = [];
let countriesActiveProp = 'totalConfirmed';
const countriesDetails = [];

const sortCountriesByParam = (field) => function innerSort(a, b) {
  let compareResult = null;
  if (a[field] > b[field]) {
    compareResult = -1;
  }
  if (a[field] < b[field]) {
    compareResult = 1;
  }
  if (a[field] === b[field]) {
    compareResult = 0;
  }
  return compareResult;
};

// const fetchFlagAndPopulation = async () => {
//   const response = await fetch('https://restcountries.eu/rest/v2/all?fields=name;population;flag');
//   const data = await response.json();
//   data.forEach((details) => countriesDetails.push(details));
//   return countriesDetails;
// };

const handleFetchingData = async (currentParam) => {
  const param = currentParam;
  const response = await fetch(fetchSummary);
  const data = await response.json();
  const detailsResponse = await fetch('https://restcountries.eu/rest/v2/all?fields=name;population;flag');
  const detailsData = await detailsResponse.json();
  detailsData.forEach((details) => countriesDetails.push(details));
  countriesList = data.Countries.map(({
    Country,
    Slug,
    CountryCode,
    NewConfirmed,
    NewDeaths,
    NewRecovered,
    TotalConfirmed,
    TotalDeaths,
    TotalRecovered,
  }) => {
    const item = {};
    item.country = Country;
    item.slug = Slug;
    item.countryCode = CountryCode;
    item.newConfirmed = NewConfirmed;
    item.newDeaths = NewDeaths;
    item.newRecovered = NewRecovered;
    item.totalConfirmed = TotalConfirmed;
    item.totalDeaths = TotalDeaths;
    item.totalRecovered = TotalRecovered;
    return item;
  });
  countriesList.sort(sortCountriesByParam(param));
  handleRenderingAllCountriesList(countriesList, param, countriesDetails);
  return countriesList;
};

document.addEventListener('DOMContentLoaded', () => {
  const dataParams = document.querySelectorAll('.data-panel');
  handleFetchingData(countriesActiveProp);
  dataParams.forEach((item) => item.addEventListener('click', (e) => {
    countriesActiveProp = e.target.dataset.info;
    handleFetchingData(countriesActiveProp);
  }));
});
