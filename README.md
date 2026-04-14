# EasyTrip

Aplicação de planejamento de viagens que fornece informações em tempo real sobre destinos: clima, câmbio e dados do país, integrando APIs externas.

## Stack

**Monorepo** gerenciado com [Turborepo](https://turbo.build).

| Pacote | Tecnologias |
|--------|-------------|
| `apps/backend` | NestJS, TypeScript, @nestjs/axios, @nestjs/config |
| `apps/frontend` | React 19, TypeScript, Vite, TanStack Router, TailwindCSS, shadcn/ui |

**APIs externas:** OpenWeatherMap · RestCountries · ExchangeRate

---

## Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/marcella-81/EasyTrip.git
cd EasyTrip
```

### 2. Configure as variáveis de ambiente

Crie `apps/backend/.env`:

```env
PORT=3000
OPENWEATHER_API_KEY=sua_chave_aqui
EXCHANGERATE_API_KEY=sua_chave_aqui
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute em modo desenvolvimento

```bash
npm run dev
```

Isso inicia em paralelo:
- **Backend** NestJS em `http://localhost:3000`
- **Frontend** Vite em `http://localhost:5173` (proxy `/api` → `:3000`)

---

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Backend + frontend em paralelo com hot-reload |
| `npm run build` | Build de todos os pacotes (com cache Turborepo) |
| `npm run lint` | Lint em todos os pacotes |
| `npm run test` | Testes em todos os pacotes |

---

## Estrutura do projeto

```
EasyTrip/
├── apps/
│   ├── backend/        NestJS — serve API em /api/destination/:name
│   └── frontend/       React + Vite — interface do usuário
├── turbo.json          Pipeline do Turborepo
└── package.json        Workspaces npm
```

---

## Variáveis de ambiente

| Variável | Descrição |
|----------|-----------|
| `OPENWEATHER_API_KEY` | Chave da [OpenWeatherMap API](https://openweathermap.org/api) |
| `EXCHANGERATE_API_KEY` | Chave da [ExchangeRate API](https://www.exchangerate-api.com) |
| `PORT` | Porta do backend (padrão: `3000`) |

As chaves de API não são armazenadas no repositório. Caso alguma tenha sido exposta, revogue imediatamente e gere uma nova.

---

## Contribuição

1. Crie uma branch (`git checkout -b feature/minha-feature`)
2. Commit suas alterações
3. Push para a branch (`git push origin feature/minha-feature`)
4. Abra um Pull Request
