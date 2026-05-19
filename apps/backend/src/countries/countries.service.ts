import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

export interface CountryMeta {
  cca2: string;
  cca3: string;
  name: string;
  continent: string;
  region: string;
  subregion: string;
  borders: string[];
  latlng: [number, number];
  landlocked: boolean;
  languages: string[];
  currencies: string[];
  population: number;
  area: number;
  flag: string;
}

interface RestCountry {
  cca2: string;
  cca3: string;
  name: { common: string };
  continents: string[];
  region: string;
  subregion?: string;
  borders?: string[];
  latlng?: number[];
  landlocked?: boolean;
  languages?: Record<string, string>;
  currencies?: Record<string, { name?: string; symbol?: string }>;
  population?: number;
  area?: number;
  flags?: { svg?: string; png?: string };
}

@Injectable()
export class CountriesService {
  private readonly baseUrl = 'https://restcountries.com/v3.1';
  private readonly fields =
    'cca2,cca3,name,continents,region,subregion,borders,latlng,landlocked,languages,currencies,population,area,flags';

  private readonly byCca2 = new Map<string, CountryMeta>();
  private readonly byCca3 = new Map<string, CountryMeta>();
  private readonly byNameLower = new Map<string, CountryMeta>();
  private readonly bySubregion = new Map<string, CountryMeta[]>();
  private allLoaded = false;

  constructor(private readonly http: HttpService) {}

  async loadAll(): Promise<void> {
    if (this.allLoaded) return;
    try {
      const { data } = await firstValueFrom(
        this.http.get<RestCountry[]>(
          `${this.baseUrl}/all?fields=${this.fields}`,
        ),
      );
      for (const raw of data) {
        this.cache(raw);
      }
      this.allLoaded = true;
    } catch {
      // best effort: continua sem o cache completo
    }
  }

  getAll(): CountryMeta[] {
    return Array.from(this.byCca2.values());
  }

  async getByName(name: string): Promise<CountryMeta> {
    const lower = name.toLowerCase().trim();
    const cached = this.byNameLower.get(lower);
    if (cached) return cached;

    try {
      const { data } = await firstValueFrom(
        this.http.get<RestCountry[]>(
          `${this.baseUrl}/name/${encodeURIComponent(name)}?fields=${this.fields}`,
        ),
      );
      const first = data[0];
      if (!first) throw new Error('empty');
      return this.cache(first);
    } catch {
      throw new NotFoundException(`País "${name}" não encontrado.`);
    }
  }

  async getByCca2(cca2: string): Promise<CountryMeta | null> {
    const upper = cca2.toUpperCase();
    const cached = this.byCca2.get(upper);
    if (cached) return cached;

    try {
      const { data } = await firstValueFrom(
        this.http.get<RestCountry[]>(
          `${this.baseUrl}/alpha/${upper}?fields=${this.fields}`,
        ),
      );
      const first = data[0];
      if (!first) return null;
      return this.cache(first);
    } catch {
      return null;
    }
  }

  async getByCca3(cca3: string): Promise<CountryMeta | null> {
    const upper = cca3.toUpperCase();
    const cached = this.byCca3.get(upper);
    if (cached) return cached;

    try {
      const { data } = await firstValueFrom(
        this.http.get<RestCountry[]>(
          `${this.baseUrl}/alpha/${upper}?fields=${this.fields}`,
        ),
      );
      const first = data[0];
      if (!first) return null;
      return this.cache(first);
    } catch {
      return null;
    }
  }

  async getBySubregion(subregion: string): Promise<CountryMeta[]> {
    if (!subregion) return [];
    const cached = this.bySubregion.get(subregion);
    if (cached) return cached;

    try {
      const { data } = await firstValueFrom(
        this.http.get<RestCountry[]>(
          `${this.baseUrl}/subregion/${encodeURIComponent(subregion)}?fields=${this.fields}`,
        ),
      );
      const metas = data.map((c) => this.cache(c));
      this.bySubregion.set(subregion, metas);
      return metas;
    } catch {
      return [];
    }
  }

  private cache(raw: RestCountry): CountryMeta {
    const meta: CountryMeta = {
      cca2: raw.cca2,
      cca3: raw.cca3,
      name: raw.name.common,
      continent: raw.continents?.[0] ?? '',
      region: raw.region ?? '',
      subregion: raw.subregion ?? '',
      borders: raw.borders ?? [],
      latlng: [raw.latlng?.[0] ?? 0, raw.latlng?.[1] ?? 0] as [number, number],
      landlocked: raw.landlocked ?? false,
      languages: raw.languages ? Object.values(raw.languages) : [],
      currencies: raw.currencies ? Object.keys(raw.currencies) : [],
      population: raw.population ?? 0,
      area: raw.area ?? 0,
      flag: raw.flags?.svg ?? raw.flags?.png ?? '',
    };
    this.byCca2.set(meta.cca2, meta);
    this.byCca3.set(meta.cca3, meta);
    this.byNameLower.set(meta.name.toLowerCase(), meta);
    return meta;
  }
}
