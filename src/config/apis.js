import dotenv from 'dotenv';
dotenv.config();
export default {
  openWeather: {
    baseUrl: 'https://api.openweathermap.org/data/2.5',
    apiKey: process.env.OPENWEATHER_API_KEY,  },

  restCountries: {
    baseUrl: 'https://restcountries.com/v3.1',
  },
  exchangeRate: {
    baseUrl: 'https://v6.exchangerate-api.com/v6',
    apiKey: process.env.EXCHANGERATE_API_KEY,
  },
};