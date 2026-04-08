import axios from 'axios';
import apis from '../config/apis.js';

export async function getWeather(city) {
  console.log('API Key do apis.js:', apis.openWeather?.apiKey);
  console.log('Base URL:', apis.openWeather?.baseUrl);

  const apiKey = apis.openWeather?.apiKey || process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error('Chave da OpenWeather não configurada (apis.js ou .env)');
  }

  // Remove acentos — o axios já faz o encoding automático no params
  const encodedCity = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  try {
    const { data } = await axios.get(`${apis.openWeather.baseUrl}/weather`, {
      params: {
        q: encodedCity,
        appid: apiKey,
        units: 'metric',
        lang: 'pt_br'
      },
    });

    return {
      descricao: data.weather[0].description,
      temperatura: `${Math.round(data.main.temp)}°C`,
      sensacao: `${Math.round(data.main.feels_like)}°C`,
      umidade: `${data.main.humidity}%`,
    };
  } catch (error) {
    console.error('Erro completo na OpenWeather:', error.response?.status, error.response?.data);
    throw new Error(`Falha ao obter clima para ${city}: ${error.response?.data?.message || error.message}`);
  }
}