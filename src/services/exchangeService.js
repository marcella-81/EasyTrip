import axios from 'axios';
import apis from '../config/apis.js';

export async function convertToBRL(currencyCode) {
  const url = `${apis.exchangeRate.baseUrl}/${apis.exchangeRate.apiKey}/latest/${currencyCode}`;

  const { data } = await axios.get(url);

  return {
    moedaOrigem: currencyCode,
    cotacaoEmBRL: `1 ${currencyCode} = R$ ${data.conversion_rates.BRL}`,
  };
}