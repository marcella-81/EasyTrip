# EasyTrip

É uma aplicação desenvolvida para crirar seus roteiros de viagens, integrando APIs externas para fornecer informações úteis como clima e câmbio em tempo real.


## Tecnologias:

* Node.js
* Express
* APIs externas (OpenWeather, ExchangeRate)
* JavaScript


## Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/marcella-81/EasyTrip.git
cd EasyTrip
```


### 2. Instale as dependências

```bash
npm install
```


### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
OPENWEATHER_API_KEY=sua_chave_aqui
EXCHANGE_API_KEY=sua_chave_aqui
```


### 4. Execute o projeto

```bash
node src/app.js
```

Se tudo estiver correto, o servidor irá iniciar.

---

## ⚠️ Problemas comuns

* Erro de API → verifique se o `.env` foi criado corretamente
* Módulos não encontrados → execute `npm install`
* Porta em uso → altere a porta no projeto

---

## Para Segurança:

As chaves de API não são armazenadas no repositório por motivos de segurança.

Caso alguma chave tenha sido exposta anteriormente:

* Revogue imediatamente
* Gere uma nova chave

---

## Para Contribuição:

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/minha-feature`)
3. Commit suas alterações (`git commit -m 'Minha contribuição'`)
4. Push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

