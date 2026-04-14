import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CountryService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.baseUrl = 'https://restcountries.com/v3.1';
  }

  async getCountryInfo(countryName: string) {
    try {
      const { data } = await firstValueFrom(
        this.http.get(`${this.baseUrl}/name/${countryName}`),
      );

      const country = data[0];
      const currency = Object.values(country.currencies as Record<string, { name: string; symbol: string }>)[0];

      return {
        capital: country.capital?.[0] ?? country.name.common,
        idioma: Object.values(country.languages as Record<string, string>)[0],
        moeda: `${currency.name} (${currency.symbol})`,
        codigoMoeda: Object.keys(country.currencies)[0] as string,
        populacao: (country.population as number).toLocaleString('pt-BR'),
        continente: country.continents[0] as string,
      };
    } catch {
      throw new NotFoundException(`País "${countryName}" não encontrado.`);
    }
  }
}
