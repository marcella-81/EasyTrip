import axios from 'axios';
import apis from '../config/apis.js';

export async function getCountryInfo(countryName) {
  const { data } = await axios.get(`${apis.restCountries.baseUrl}/name/${countryName}`);
  const country = data[0];
  const currency = Object.values(country.currencies)[0];

  return {
    capital: country.capital?.[0] || country.name.common, // 👈 melhoria
    idioma: Object.values(country.languages)[0],
    moeda: `${currency.name} (${currency.symbol})`,
    codigoMoeda: Object.keys(country.currencies)[0],
    populacao: country.population.toLocaleString('pt-BR'),
    continente: country.continents[0],
  };
}