import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExchangeService {
  private readonly baseUrl = 'https://v6.exchangerate-api.com/v6';

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async convertToBRL(currencyCode: string) {
    const apiKey = this.config.get<string>('EXCHANGERATE_API_KEY');
    if (!apiKey) {
      throw new InternalServerErrorException('Chave da ExchangeRate não configurada.');
    }

    try {
      const { data } = await firstValueFrom(
        this.http.get(`${this.baseUrl}/${apiKey}/latest/${currencyCode}`),
      );

      const brl = (data.conversion_rates as Record<string, number>).BRL;

      return {
        moedaOrigem: currencyCode,
        cotacaoEmBRL: `1 ${currencyCode} = R$ ${brl}`,
      };
    } catch {
      throw new InternalServerErrorException(`Falha ao obter câmbio para ${currencyCode}.`);
    }
  }
}
