import '../styles/main.scss';

import { fetchSummary } from '../api/covid';
import handleRenderingAllCountriesList from './countries-list/countriesList';

let countriesList = [];
const countriesActiveProp = 'totalConfirmed';

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

fetch(fetchSummary).then((response) => response.json()).then((data) => {
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
  countriesList.sort(sortCountriesByParam(countriesActiveProp));
  handleRenderingAllCountriesList(countriesList, countriesActiveProp);
  return countriesList;
});
