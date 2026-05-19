import { Injectable } from '@nestjs/common';
import { CountryMeta, CountriesService } from '../countries/countries.service';
import {
  keywordMap,
  normalizeText,
  removeStopwords,
} from './keyword-map';

export interface SemanticSearchResult {
  cca2: string;
  cca3: string;
  name: string;
  flag: string;
  continent: string;
  subregion: string;
  matchedTags: string[];
  score: number;
}

@Injectable()
export class SemanticSearchService {
  constructor(private readonly countries: CountriesService) {}

  async search(query: string): Promise<SemanticSearchResult[]> {
    await this.countries.loadAll();
    const all = this.countries.getAll();
    const lowerQuery = normalizeText(query);
    const words = removeStopwords(query);

    // 1. Tentar match de frases inteiras primeiro
    const matchedEntries = keywordMap.filter((entry) =>
      entry.keywords.some((k) => {
        const normK = normalizeText(k);
        return lowerQuery.includes(normK) || normK.includes(lowerQuery);
      }),
    );

    // 2. Se não achou frase, tentar match por palavras individuais
    const wordMatches = keywordMap.filter((entry) =>
      words.some((word) =>
        entry.keywords.some((k) => normalizeText(k).includes(word)),
      ),
    );

    const allFilters = [...matchedEntries, ...wordMatches];

    if (allFilters.length === 0) {
      // Fallback: busca por substring no nome do país
      return this.fallbackNameSearch(all, lowerQuery);
    }

    // 3. Aplicar filtros com lógica AND (todos os filtros devem passar)
    const results: SemanticSearchResult[] = [];

    for (const country of all) {
      const tags: string[] = [];
      let totalScore = 0;
      let matchedCount = 0;

      for (const entry of allFilters) {
        if (entry.filter(country)) {
          tags.push(entry.tag);
          totalScore += entry.score;
          matchedCount++;
        }
      }

      // Só inclui se passou em pelo menos um filtro
      if (matchedCount > 0) {
        results.push({
          cca2: country.cca2,
          cca3: country.cca3,
          name: country.name,
          flag: country.flag,
          continent: country.continent,
          subregion: country.subregion,
          matchedTags: [...new Set(tags)], // dedup tags
          score: totalScore + matchedCount * 2, // bônus por múltiplos matches
        });
      }
    }

    // 4. Ordenar por score decrescente e limitar a 15
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, 15);
  }

  private fallbackNameSearch(
    all: CountryMeta[],
    query: string,
  ): SemanticSearchResult[] {
    const matches = all.filter(
      (c) =>
        normalizeText(c.name).includes(query) ||
        c.cca2.toLowerCase() === query ||
        c.cca3.toLowerCase() === query,
    );

    return matches
      .map<SemanticSearchResult>((c) => ({
        cca2: c.cca2,
        cca3: c.cca3,
        name: c.name,
        flag: c.flag,
        continent: c.continent,
        subregion: c.subregion,
        matchedTags: [],
        score: 1,
      }))
      .slice(0, 10);
  }
}
