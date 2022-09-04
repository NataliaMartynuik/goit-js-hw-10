const BASE_URL = 'https://restcountries.com/v3.1/name'

function fetchCountries(country) {
    return fetch(`${BASE_URL}/${country}?fields=name,capital,flags,population,languages`)
        .then(response => response.json())
}      

export default { fetchCountries }


