import buttonsPanel from './buttonsPanel';

const container = document.querySelector('.countries');
const title = document.createElement('h4');
title.innerText = 'Countries';
const list = document.createElement('ul');
const panel = buttonsPanel();
container.append(title, list);
container.insertAdjacentHTML('afterbegin', panel);

const handleRenderingAllCountriesList = (
  countriesList,
  countriesActiveProp,
  details,
  isRelative,
) => {
  const countries = countriesList;
  while (list.hasChildNodes()) {
    list.removeChild(list.lastChild);
  }
  countries.forEach((item) => {
    const key = item.country;
    const index = details.findIndex((i) => i.name === key);
    const currentDetail = details[index];
    let value;
    if (currentDetail) {
      value = isRelative
        ? Math.ceil((item[countriesActiveProp] / currentDetail.population) * 100000) || '-'
        : Math.ceil(item[countriesActiveProp]);
    } else value = '-';
    const flagImg = currentDetail ? currentDetail.flag : null;
    const countryContainer = document.createElement('li');
    const keySpan = document.createElement('span');
    keySpan.innerText = key;
    const flagSpan = document.createElement('img');
    flagSpan.classList.add('flag-icon');
    flagSpan.src = flagImg;
    const valueSpan = document.createElement('span');
    valueSpan.innerText = value;
    if (flagImg) {
      countryContainer.append(keySpan, flagSpan, valueSpan);
    } else {
      countryContainer.append(keySpan, valueSpan);
    }
    list.append(countryContainer);
  });
};

export default handleRenderingAllCountriesList;
