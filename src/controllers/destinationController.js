// destinationController.js
import { getWeather } from '../services/weatherService.js';
import { getCountryInfo } from '../services/countryService.js';
import { convertToBRL } from '../services/exchangeService.js';

export async function getDestination(req, res) {
  const { name } = req.params;

  try {
    const pais = await getCountryInfo(name);
    const clima = await getWeather(pais.capital);
    const cambio = await convertToBRL(pais.codigoMoeda);

    res.json({
      destino: name,
      clima,
      informacoesDoPais: pais,
      cambio,
      geradoEm: new Date().toLocaleString('pt-BR'),
    });
  } catch (err) {
    console.error('ERRO no controller:', err.message);
    res.status(500).json({
      erro: 'Destino não encontrado ou erro nas APIs.',
      detalhe: err.message
    });
  }
}