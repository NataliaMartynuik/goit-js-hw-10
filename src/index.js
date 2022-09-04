import './css/styles.css';
import API from './fetchCountries'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputCountry = document.querySelector('#search-box')
const countryInfo = document.querySelector('.country-info')
const countryList = document.querySelector('.country-list')

inputCountry.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

function onSearch() {
    let name = inputCountry.value.trim();
    if (name === '') {
        return (countryList.innerHTML = ''), (countryInfo.innerHTML = '')
    }

    API.fetchCountries(name)
        .then(countries => {
            countryList.innerHTML = '';
            countryInfo.innerHTML = '';

            if (countries.length === 1) {
                countryList.insertAdjacentHTML('beforeend', createCountryList(countries))
                countryInfo.insertAdjacentHTML('beforeend', createCountryCard(countries))
            } else if (countries.length >= 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } else {
                countryList.insertAdjacentHTML('beforeend', createCountryList(countries))
            }
        })
        .catch(countries => {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        })
}
       
   
function createCountryCard(countries) {
    const markup = countries
    .map(({ capital, population, languages }) => {
      return `
        <ul class="country-info__list">
            <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
            <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
            <li class="country-info__item"><p><b>Languages: </b>${Object.values(languages).join(', ')}</p></li>
        </ul>
        `
    })
    .join('')
  return markup
  
}

function createCountryList(countries) {
    const markup = countries
        .map(({ name, flags }) => {
            return `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="${name.official}" width = 30px height = 30px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>
          `
        })
        .join('')
    return markup
}
