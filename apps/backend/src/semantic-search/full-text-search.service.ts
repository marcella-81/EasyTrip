import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import MiniSearch from 'minisearch';
import { PorterStemmerPt } from 'natural';
import { CountriesService } from '../countries/countries.service';
import { buildProfile } from './country-profile';

@Injectable()
export class FullTextSearchService implements OnModuleInit {
  private readonly logger = new Logger(FullTextSearchService.name);
  private index: MiniSearch<{ id: string; profile: string }>;

  constructor(private readonly countries: CountriesService) {
    this.index = new MiniSearch({
      fields: ['profile'],
      storeFields: ['id'],
      tokenize: (text) => text.toLowerCase().split(/[\s,.\-/()]+/).filter(Boolean),
      processTerm: (term) => PorterStemmerPt.stem(term),
    });
  }

  async onModuleInit() {
    await this.countries.loadAll();
    const all = this.countries.getAll();

    const docs = all.map((c) => ({
      id: c.cca2,
      profile: buildProfile(c),
    }));

    this.index.addAll(docs);
    this.logger.log(`index built: ${docs.length} countries`);
  }

  search(query: string): string[] {
    const results = this.index.search(query, {
      prefix: true,
      fuzzy: 0.15,
      boost: { profile: 1 },
    });
    return results.map((r) => r.id as string);
  }
}
