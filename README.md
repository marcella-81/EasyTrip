# EasyTrip

Plataforma de planejamento de viagens que reúne em um só lugar tudo que você precisa saber antes de embarcar: clima, câmbio, informações do país e histórico de destinos pesquisados. 

## Funcionalidades: 
Busca de destinos — pesquise qualquer país e veja clima atual, moeda local e cotação em reais
Clima em tempo real — temperatura, sensação térmica e umidade via OpenWeatherMap
Conversão de moeda — cotação atualizada da moeda local para BRL
Informações do país — capital, idioma, população e continente
Perfil do usuário — histórico de pesquisas com gráficos e mapa interativo de países visitados
Favoritos — salve e gerencie seus destinos preferidos
Autenticação — cadastro e login com JWT

## Stack

**Monorepo** gerenciado com [Turborepo](https://turbo.build).

| Pacote | Tecnologias |
|--------|-------------|
| `apps/backend` | NestJS, TypeScript, @nestjs/axios, @nestjs/config |
| `apps/frontend` | React 19, TypeScript, Vite, TanStack Router, TailwindCSS, shadcn/ui |

**APIs externas:** OpenWeatherMap · RestCountries · ExchangeRate

---

## Como rodar localmente

O backend roda em **Docker**, conectado ao Postgres **compartilhado no Railway** (ambiente `dev`).
Ninguém precisa rodar `prisma generate` ou `prisma migrate` manualmente — o container faz tudo no boot.

### 1. Clone o repositório

```bash
git clone https://github.com/marcella-81/EasyTrip.git
cd EasyTrip
```

### 2. Configure o `.env` do backend

Copie o exemplo e preencha:

```bash
cp apps/backend/.env.example apps/backend/.env
```

Peça a `DATABASE_URL` ao dono do projeto (ou pegue no Railway:
`easytrip` → env `dev` → serviço `Postgres` → Variables → `DATABASE_PUBLIC_URL`).

### 3. Instale dependências do monorepo (para o frontend rodar local)

```bash
npm install
```

### 4. Suba o backend em Docker

```bash
npm run backend:up       # build + start em background
npm run backend:logs     # acompanha logs (Ctrl+C pra sair, container segue rodando)
```

No boot o container executa:
1. `prisma generate`
2. `prisma migrate deploy` (aplica migrations pendentes no Railway)
3. `nest start --watch`

Hot-reload: edições em `apps/backend/src`, `apps/backend/prisma` e `packages/shared/src` refletem automaticamente.

### 5. Rode o frontend local

```bash
npm run dev --workspace=@easytrip/frontend
```

- **Backend** (Docker): `http://localhost:3000`
- **Frontend** (Vite): `http://localhost:5173` (proxy `/api` → `:3000`)

---

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run backend:up` | Build + start do backend em Docker (conecta no Railway) |
| `npm run backend:down` | Para o backend |
| `npm run backend:logs` | Tail dos logs do backend |
| `npm run backend:rebuild` | Rebuild completo da imagem (use após mudar `package.json`/`Dockerfile`) |
| `npm run db:test:up` | Sobe Postgres local em tmpfs (porta 5433) pra rodar testes |
| `npm run db:test:down` | Para o Postgres de teste |
| `npm run dev` | Backend + frontend em paralelo com hot-reload (sem Docker) |
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
