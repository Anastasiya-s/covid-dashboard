import detailsButtonsPanel from './detailsButtonsPanel';

const panel = detailsButtonsPanel();
const container = document.querySelector('.data');
const title = document.createElement('h4');
const list = document.createElement('ul');
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
  casesEl.innerText = isRelative ? getRelativeValue(cases, population) : cases;
  const deathsEl = document.createElement('li');
  deathsEl.innerText = isRelative ? getRelativeValue(deaths, population) : deaths;
  const recoveredEl = document.createElement('li');
  recoveredEl.innerText = isRelative ? getRelativeValue(recovered, population) : recovered;
  list.append(casesEl, deathsEl, recoveredEl);
};

export default renderDetails;
