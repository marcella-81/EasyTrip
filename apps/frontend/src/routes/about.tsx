export default function About() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Sobre o EasyTrip</h1>
      <p className="text-gray-600 mb-4">
        O EasyTrip é uma plataforma de planejamento de viagens que reúne
        em um só lugar informações sobre clima, câmbio e dados do país de destino.
      </p>
      <h2 className="text-xl font-semibold mb-2">Tecnologias utilizadas</h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li>React 19 + TypeScript</li>
        <li>NestJS no back-end</li>
        <li>TailwindCSS + shadcn/ui</li>
        <li>OpenWeatherMap, RestCountries, ExchangeRate API</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Equipe</h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li>Marcella</li>
        <li>Paula</li>
        <li>Pedro Cardoso</li>
        <li>Richard</li>
        <li>Gustavo Correia</li>
      </ul>
    </div>
  )
}
