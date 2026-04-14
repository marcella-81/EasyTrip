const FLAGS: Record<string, string> = {
  france: '🇫🇷',
  brazil: '🇧🇷',
  brasil: '🇧🇷',
  japan: '🇯🇵',
  'united states': '🇺🇸',
  usa: '🇺🇸',
  germany: '🇩🇪',
  italy: '🇮🇹',
  spain: '🇪🇸',
  portugal: '🇵🇹',
  argentina: '🇦🇷',
  canada: '🇨🇦',
  australia: '🇦🇺',
  china: '🇨🇳',
  india: '🇮🇳',
  mexico: '🇲🇽',
  'united kingdom': '🇬🇧',
  netherlands: '🇳🇱',
  colombia: '🇨🇴',
  chile: '🇨🇱',
  peru: '🇵🇪',
  norway: '🇳🇴',
  sweden: '🇸🇪',
  switzerland: '🇨🇭',
}

export function getCountryFlag(destination: string): string {
  return FLAGS[destination.toLowerCase()] ?? '🌍'
}
