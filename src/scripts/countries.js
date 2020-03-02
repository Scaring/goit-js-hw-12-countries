import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import countryArticleTemplate from '../templates/country.hbs';
import PNotify from 'pnotify/dist/es/PNotify.js';

const country = document.querySelector('.country');
const countryList = document.querySelector('.country-list');
const input = document.querySelector('input[name="input"]');

input.addEventListener('input', debounce(searchFromInputFinish, 1000));

function searchFromInputFinish(e) {
  const searchQuery = e.target.value;
  if (searchQuery === '') return;
  clearCountries();

  fetchCountries(searchQuery).then(data => {
    const countriesCount = data.length;
    if (countriesCount == 1) {
      const markup = buildArticleCountry(data[0]);
      insertToPage(country, markup);
    } else if (countriesCount <= 10 && countriesCount > 1) {
      let markup = '';
      data.forEach(element => {
        markup += `<li>${element.name}</li>`;
      });
      insertToPage(countryList, markup);
    } else {
      PNotify.error({
        text: 'Too many matches found. Please enter a more specific query',
        delay: 2000,
      });
    }
  });
}

function insertToPage(insertTo, item) {
  insertTo.insertAdjacentHTML('beforeend', item);
}

function buildArticleCountry(item) {
  return countryArticleTemplate(item);
}

function clearCountries() {
  country.innerHTML = '';
  countryList.innerHTML = '';
}
