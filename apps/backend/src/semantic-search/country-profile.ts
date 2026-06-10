import { CountryMeta } from '../countries/countries.service';

// Labels descritivos bilíngues por faixa de latitude
function climateTokens(lat: number): string {
  const a = Math.abs(lat);
  if (a >= 66.5) return 'polar arctic glacial neve snow gelo ice extremo extreme congelado frozen';
  if (a >= 50)   return 'frio cold gelado freezing neve snow inverno winter temperatura baixa';
  if (a >= 35)   return 'fresco cool temperado temperate clima ameno mild moderate';
  if (a >= 23.5) return 'quente warm calor heat sol sun verão summer subtropical';
  return 'tropical quente hot calor trópico tropics sol sun humid chuva rain floresta forest';
}

function hemisphereTokens(lat: number): string {
  if (lat > 0) return 'hemisferio norte northern hemisphere inverno dezembro winter december verão julho summer july';
  if (lat < 0) return 'hemisferio sul southern hemisphere inverno julho winter july verão dezembro summer december estações invertidas';
  return '';
}

function populationTokens(pop: number): string {
  if (pop > 100_000_000) return 'populoso populous muita gente muitos habitantes densamente populated large population';
  if (pop < 5_000_000)   return 'pouco populado sparsely populated pouca gente poucos habitantes pequena população';
  return '';
}

function areaTokens(area: number): string {
  if (area > 1_000_000) return 'grande big large enorme gigante giant huge extenso vast';
  if (area < 100_000)   return 'pequeno small tiny minúsculo minuscule compact';
  return '';
}

// Mapa de cca3 para nome em PT (principais vizinhos)
const cca3ToPt: Record<string, string> = {
  ARG: 'argentina', BRA: 'brasil', CHL: 'chile', URY: 'uruguai', PRY: 'paraguai',
  BOL: 'bolívia', PER: 'peru', COL: 'colômbia', VEN: 'venezuela', ECU: 'equador',
  USA: 'estados unidos', CAN: 'canadá', MEX: 'méxico',
  FRA: 'franca', DEU: 'alemanha', ESP: 'espanha', ITA: 'italia', PRT: 'portugal',
  GBR: 'reino unido', NLD: 'holanda', BEL: 'bélgica', CHE: 'suíça', AUT: 'áustria',
  POL: 'polônia', RUS: 'rússia', UKR: 'ucrânia', SWE: 'suécia', NOR: 'noruega',
  FIN: 'finlândia', DNK: 'dinamarca', CHN: 'china', JPN: 'japão', IND: 'índia',
  ZAF: 'africa do sul', EGY: 'egito', MAR: 'marrocos', NGA: 'nigéria',
  AUS: 'australia', NZL: 'nova zelândia',
};

export function buildProfile(country: CountryMeta): string {
  const parts: string[] = [];

  // Nome
  parts.push(country.name.toLowerCase());

  // Continente e sub-região
  parts.push(country.continent.toLowerCase());
  parts.push(country.subregion.toLowerCase());

  // Idiomas
  country.languages.forEach(l => parts.push(l.toLowerCase()));

  // Moedas (código + nome descritivo quando possível)
  country.currencies.forEach(c => parts.push(c.toLowerCase()));

  // Clima e hemisfério
  const hasCoords = !(country.latlng[0] === 0 && country.latlng[1] === 0);
  if (hasCoords) {
    parts.push(climateTokens(country.latlng[0]));
    parts.push(hemisphereTokens(country.latlng[0]));
  }

  // Litoral
  if (country.landlocked) {
    parts.push('sem litoral landlocked interior sem costa sem praia sem mar');
  } else {
    parts.push('com litoral coastal costeiro praia beach mar sea oceano ocean');
    // Países pequenos e não landlocked → "ilha island" heurística
    if (country.area < 300_000 || country.name.toLowerCase().includes('island')) {
      parts.push('ilha island ilhas islands país ilha island nation');
    }
  }

  // População e área
  parts.push(populationTokens(country.population));
  parts.push(areaTokens(country.area));

  // Vizinhos
  country.borders.forEach(b => {
    parts.push(b.toLowerCase());
    const pt = cca3ToPt[b];
    if (pt) parts.push(`vizinho ${pt} border ${pt} fronteira ${pt}`);
  });

  return parts.filter(Boolean).join(' ');
}
