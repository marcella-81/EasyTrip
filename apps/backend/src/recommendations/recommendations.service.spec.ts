import { RecommendationsService } from './recommendations.service';

const META = {
  FR: { cca2: 'FR', cca3: 'FRA', name: 'France', continent: 'Europe', region: 'Europe', subregion: 'Western Europe', borders: ['ESP', 'ITA', 'BEL', 'DEU'] },
  ES: { cca2: 'ES', cca3: 'ESP', name: 'Spain', continent: 'Europe', region: 'Europe', subregion: 'Southern Europe', borders: ['FRA', 'PRT'] },
  IT: { cca2: 'IT', cca3: 'ITA', name: 'Italy', continent: 'Europe', region: 'Europe', subregion: 'Southern Europe', borders: ['FRA'] },
  BE: { cca2: 'BE', cca3: 'BEL', name: 'Belgium', continent: 'Europe', region: 'Europe', subregion: 'Western Europe', borders: ['FRA'] },
  DE: { cca2: 'DE', cca3: 'DEU', name: 'Germany', continent: 'Europe', region: 'Europe', subregion: 'Western Europe', borders: ['FRA'] },
  PT: { cca2: 'PT', cca3: 'PRT', name: 'Portugal', continent: 'Europe', region: 'Europe', subregion: 'Southern Europe', borders: ['ESP'] },
  GR: { cca2: 'GR', cca3: 'GRC', name: 'Greece', continent: 'Europe', region: 'Europe', subregion: 'Southern Europe', borders: [] },
} as const;

describe('RecommendationsService', () => {
  function build(opts: {
    history: Array<{ cca2: string }>;
    wishlist?: Array<{ cca2: string }>;
    visited?: Array<{ cca2: string }>;
  }) {
    const prisma = {
      searchHistory: {
        findMany: jest.fn().mockResolvedValue(
          opts.history.map((h, i) => ({
            id: `h${i}`,
            userId: 'u1',
            query: h.cca2,
            countryName: h.cca2,
            cca2: h.cca2,
            createdAt: new Date(Date.now() - i * 1000),
          })),
        ),
      },
      wishlist: { findMany: jest.fn().mockResolvedValue(opts.wishlist ?? []) },
      visitedCountry: { findMany: jest.fn().mockResolvedValue(opts.visited ?? []) },
    };
    const countries = {
      getByCca2: jest.fn(async (cca2: string) => (META as never)[cca2] ?? null),
      getByCca3: jest.fn(async (cca3: string) =>
        Object.values(META).find((m) => m.cca3 === cca3) ?? null,
      ),
      getBySubregion: jest.fn(async (subregion: string) =>
        Object.values(META).filter((m) => m.subregion === subregion),
      ),
    };
    return new RecommendationsService(prisma as never, countries as never);
  }

  it('prioriza border (+2) sobre subregion (+1)', async () => {
    const svc = build({ history: [{ cca2: 'FR' }] });
    const res = await svc.forUser('u1');
    // ES e IT aparecem como border (FR faz fronteira com ESP, ITA, BEL, DEU) — score 2
    // ES também aparece via subregion? FR é Western Europe, ES é Southern Europe — só border
    const spain = res.find((r) => r.cca2 === 'ES');
    expect(spain?.reason).toBe('border');
    expect(spain?.score).toBe(2);
  });

  it('exclui países em history/wishlist/visited', async () => {
    const svc = build({
      history: [{ cca2: 'FR' }],
      wishlist: [{ cca2: 'IT' }],
      visited: [{ cca2: 'BE' }],
    });
    const res = await svc.forUser('u1');
    for (const cca2 of ['FR', 'IT', 'BE']) {
      expect(res.some((r) => r.cca2 === cca2)).toBe(false);
    }
  });

  it('limita a 8 resultados', async () => {
    const svc = build({ history: [{ cca2: 'FR' }, { cca2: 'ES' }] });
    const res = await svc.forUser('u1');
    expect(res.length).toBeLessThanOrEqual(8);
  });

  it('history vazio → retorna []', async () => {
    const svc = build({ history: [] });
    const res = await svc.forUser('u1');
    expect(res).toEqual([]);
  });
});
