const mainUrl = `https://restcountries.eu/`;
const urlEndpoint = `rest/v2/name/`;

export default function fetchCountries(query) {
  return fetch(mainUrl + urlEndpoint + query).then(response =>
    response.json().catch(err => console.warn(err)),
  );
}
