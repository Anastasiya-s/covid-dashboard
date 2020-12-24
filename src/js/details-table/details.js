import detailsButtonsPanel from './detailsButtonsPanel';

const panel = detailsButtonsPanel();
const container = document.querySelector('.data');
const title = document.createElement('h4');
title.classList.add('data-country');
const list = document.createElement('ul');
list.classList.add('data-details');
container.append(title, list);
container.insertAdjacentHTML('afterbegin', panel);
const getRelativeValue = (val, pop) => Math.ceil((val / pop) * 100000);

const renderDetails = (
  countryName,
  {
    cases,
    deaths,
    recovered,
    population,
  },
  isRelative,
) => {
  while (list.hasChildNodes()) {
    list.removeChild(list.lastChild);
  }
  title.innerText = countryName;
  const casesEl = document.createElement('li');
  casesEl.innerText = isRelative ? `Cases: ${getRelativeValue(cases, population)}` : `Cases: ${cases}`;
  const deathsEl = document.createElement('li');
  deathsEl.innerText = isRelative ? `Deaths: ${getRelativeValue(deaths, population)}` : `Deaths: ${deaths}`;
  const recoveredEl = document.createElement('li');
  recoveredEl.innerText = isRelative ? `Recovered: ${getRelativeValue(recovered, population)}` : `Recovered: ${recovered}`;
  list.append(casesEl, deathsEl, recoveredEl);
};

export default renderDetails;
