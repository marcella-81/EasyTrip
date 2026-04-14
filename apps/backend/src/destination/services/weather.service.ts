import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async getWeather(city: string) {
    const apiKey = this.config.get<string>('OPENWEATHER_API_KEY');
    if (!apiKey) {
      throw new InternalServerErrorException('Chave da OpenWeather não configurada.');
    }

    const encodedCity = city.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    try {
      const { data } = await firstValueFrom(
        this.http.get(`${this.baseUrl}/weather`, {
          params: { q: encodedCity, appid: apiKey, units: 'metric', lang: 'pt_br' },
        }),
      );

      return {
        descricao: data.weather[0].description as string,
        temperatura: `${Math.round(data.main.temp as number)}°C`,
        sensacao: `${Math.round(data.main.feels_like as number)}°C`,
        umidade: `${data.main.humidity as number}%`,
      };
    } catch {
      throw new InternalServerErrorException(`Falha ao obter clima para ${city}.`);
    }
  }
}
