# API ODS - Sistema de Gestão de Descarte de Resíduos

API REST desenvolvida com NestJS para gerenciamento de pontos de descarte e registros de descarte de resíduos.

## 📋 Índice

- [Configuração](#configuração)
- [Endpoints](#endpoints)
  - [App Controller](#app-controller)
  - [Pontos de Descarte](#pontos-de-descarte)
  - [Descartes](#descartes)
  - [Relatório](#relatório)
- [Códigos de Status HTTP](#códigos-de-status-http)
- [Validações e Tipos](#validações-e-tipos)

## 🚀 Configuração

### Pré-requisitos

- Node.js (v18 ou superior)
- MongoDB (local ou remoto)
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente (opcional)
# Criar arquivo .env com:
# MONGODB_URI=mongodb://localhost:27017/ods
# PORT=3000

# Executar em modo desenvolvimento
npm run start:dev

# Executar em modo produção
npm run build
npm run start:prod
```

A API estará disponível em `http://localhost:3000` (ou na porta configurada).

## 📡 Endpoints

### Base URL

```
http://localhost:3000
```

---

## App Controller

### GET /

Retorna uma mensagem de boas-vindas.

**Requisição:**
```http
GET /
```

**Resposta (200 OK):**
```json
"Hello World!"
```

**Exemplo com cURL:**
```bash
curl --location 'http://localhost:3000/'
```

---

## Pontos de Descarte

### POST /pontos-descarte

Cria um novo ponto de descarte.

**Requisição:**
```http
POST /pontos-descarte
Content-Type: application/json
```

**Body:**
```json
{
  "nome": "Ponto de Coleta Central",
  "bairro": "Centro",
  "tipoLocal": "publico",
  "categoriasResiduos": ["plastico", "papel", "vidro"],
  "geolocalizacao": {
    "latitude": -23.5505,
    "longitude": -46.6333
  }
}
```

**Resposta (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nome": "Ponto de Coleta Central",
  "bairro": "Centro",
  "tipoLocal": "publico",
  "categoriasResiduos": ["plastico", "papel", "vidro"],
  "geolocalizacao": {
    "latitude": -23.5505,
    "longitude": -46.6333
  },
  "createdAt": "2025-11-14T00:00:00.000Z",
  "updatedAt": "2025-11-14T00:00:00.000Z"
}
```

**Exemplo com cURL:**
```bash
curl --location 'http://localhost:3000/pontos-descarte' \
--header 'Content-Type: application/json' \
--data '{
    "nome": "Ponto de Coleta Central",
    "bairro": "Centro",
    "tipoLocal": "publico",
    "categoriasResiduos": ["plastico", "papel", "vidro"],
    "geolocalizacao": {
        "latitude": -23.5505,
        "longitude": -46.6333
    }
}'
```

---

### GET /pontos-descarte

Lista todos os pontos de descarte cadastrados.

**Requisição:**
```http
GET /pontos-descarte
```

**Resposta (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nome": "Ponto de Coleta Central",
    "bairro": "Centro",
    "tipoLocal": "publico",
    "categoriasResiduos": ["plastico", "papel", "vidro"],
    "geolocalizacao": {
      "latitude": -23.5505,
      "longitude": -46.6333
    },
    "createdAt": "2025-11-14T00:00:00.000Z",
    "updatedAt": "2025-11-14T00:00:00.000Z"
  }
]
```

**Exemplo com cURL:**
```bash
curl --location 'http://localhost:3000/pontos-descarte'
```

---

### GET /pontos-descarte/:id

Busca um ponto de descarte específico por ID.

**Requisição:**
```http
GET /pontos-descarte/:id
```

**Parâmetros:**
- `id` (string, obrigatório): ID do ponto de descarte (ObjectId válido de 24 caracteres)

**Resposta (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nome": "Ponto de Coleta Central",
  "bairro": "Centro",
  "tipoLocal": "publico",
  "categoriasResiduos": ["plastico", "papel", "vidro"],
  "geolocalizacao": {
    "latitude": -23.5505,
    "longitude": -46.6333
  },
  "createdAt": "2025-11-14T00:00:00.000Z",
  "updatedAt": "2025-11-14T00:00:00.000Z"
}
```

**Resposta (404 Not Found):**
```json
{
  "statusCode": 404,
  "message": "Ponto de descarte não encontrado",
  "error": "Not Found"
}
```

**Exemplo com cURL:**
```bash
curl --location 'http://localhost:3000/pontos-descarte/507f1f77bcf86cd799439011'
```

---

## Descartes

### POST /descartes

Registra um novo descarte de resíduo.

**Requisição:**
```http
POST /descartes
Content-Type: application/json
```

**Body:**
```json
{
  "nomeUsuario": "João Silva",
  "pontoDescarteId": "507f1f77bcf86cd799439011",
  "tipoResiduo": "plastico",
  "data": "2025-11-14T00:00:00.000Z"
}
```

**Campos:**
- `nomeUsuario` (string, obrigatório): Nome do usuário que realizou o descarte
- `pontoDescarteId` (string, obrigatório): ID do ponto de descarte (ObjectId válido)
- `tipoResiduo` (string, obrigatório): Tipo de resíduo (ver [Tipos de Resíduo](#tipos-de-resíduo))
- `data` (Date, opcional): Data do descarte (padrão: data atual)

**Resposta (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "nomeUsuario": "João Silva",
  "pontoDescarteId": "507f1f77bcf86cd799439011",
  "tipoResiduo": "plastico",
  "data": "2025-11-14T00:00:00.000Z",
  "createdAt": "2025-11-14T00:00:00.000Z",
  "updatedAt": "2025-11-14T00:00:00.000Z"
}
```

**Resposta (404 Not Found):**
```json
{
  "statusCode": 404,
  "message": "Ponto de descarte não encontrado",
  "error": "Not Found"
}
```

**Exemplo com cURL:**
```bash
curl --location 'http://localhost:3000/descartes' \
--header 'Content-Type: application/json' \
--data '{
    "nomeUsuario": "João Silva",
    "pontoDescarteId": "507f1f77bcf86cd799439011",
    "tipoResiduo": "plastico",
    "data": "2025-11-14T00:00:00.000Z"
}'
```

---

### GET /descartes

Lista todos os descartes, com filtros opcionais.

**Requisição:**
```http
GET /descartes?pontoDescarteId=xxx&tipoResiduo=plastico&nomeUsuario=João&data=2025-11-14
```

**Query Parameters (todos opcionais):**
- `pontoDescarteId` (string): Filtrar por ID do ponto de descarte
- `tipoResiduo` (string): Filtrar por tipo de resíduo (ver [Tipos de Resíduo](#tipos-de-resíduo))
- `nomeUsuario` (string): Filtrar por nome do usuário (busca parcial, case-insensitive)
- `data` (string): Filtrar por data específica (formato: YYYY-MM-DD)

**Resposta (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "nomeUsuario": "João Silva",
    "pontoDescarteId": {
      "_id": "507f1f77bcf86cd799439011",
      "nome": "Ponto de Coleta Central",
      "bairro": "Centro",
      "tipoLocal": "publico",
      "categoriasResiduos": ["plastico", "papel", "vidro"],
      "geolocalizacao": {
        "latitude": -23.5505,
        "longitude": -46.6333
      }
    },
    "tipoResiduo": "plastico",
    "data": "2025-11-14T00:00:00.000Z",
    "createdAt": "2025-11-14T00:00:00.000Z",
    "updatedAt": "2025-11-14T00:00:00.000Z"
  }
]
```

**Exemplos com cURL:**

Listar todos:
```bash
curl --location 'http://localhost:3000/descartes'
```

Filtrar por ponto de descarte:
```bash
curl --location 'http://localhost:3000/descartes?pontoDescarteId=507f1f77bcf86cd799439011'
```

Filtrar por tipo de resíduo:
```bash
curl --location 'http://localhost:3000/descartes?tipoResiduo=plastico'
```

Filtrar por nome de usuário:
```bash
curl --location 'http://localhost:3000/descartes?nomeUsuario=João'
```

Filtrar por data:
```bash
curl --location 'http://localhost:3000/descartes?data=2025-11-14'
```

Múltiplos filtros:
```bash
curl --location 'http://localhost:3000/descartes?pontoDescarteId=507f1f77bcf86cd799439011&tipoResiduo=plastico&nomeUsuario=João'
```

---

## Relatório

### GET /relatorio

Gera um relatório estatístico com resumo dos dados do sistema.

**Requisição:**
```http
GET /relatorio
```

**Resposta (200 OK):**
```json
{
  "localMaisRegistros": "Ponto de Coleta Central",
  "tipoResiduoMaisFrequente": "plastico",
  "mediaDescartesPorDia": 2.5,
  "totalUsuarios": 10,
  "totalPontosDescarte": 5,
  "percentualVariacao": 15.5
}
```

**Campos retornados:**
- `localMaisRegistros` (string): Nome do local de descarte com maior número de registros (ou "N/A" se não houver)
- `tipoResiduoMaisFrequente` (string): Tipo de resíduo mais frequentemente descartado (ou "N/A" se não houver)
- `mediaDescartesPorDia` (number): Média de descartes por dia nos últimos 30 dias (arredondado para 2 casas decimais)
- `totalUsuarios` (number): Número total de usuários únicos no sistema
- `totalPontosDescarte` (number): Total de pontos de descarte cadastrados
- `percentualVariacao` (number): Percentual de crescimento ou redução comparado ao mês anterior (positivo = crescimento, negativo = redução, arredondado para 2 casas decimais)

**Exemplo com cURL:**
```bash
curl --location 'http://localhost:3000/relatorio'
```

---

## Códigos de Status HTTP

| Código | Descrição | Quando ocorre |
|--------|-----------|---------------|
| 200 | OK | Requisição bem-sucedida (GET, PUT, PATCH) |
| 201 | Created | Recurso criado com sucesso (POST) |
| 404 | Not Found | Recurso não encontrado (ID inválido ou não existe) |
| 500 | Internal Server Error | Erro interno do servidor |

---

## Validações e Tipos

### Tipos de Resíduo

Valores aceitos para o campo `tipoResiduo`:

- `plastico`
- `papel`
- `organico`
- `eletronico`
- `vidro`

### Tipos de Local

Valores aceitos para o campo `tipoLocal`:

- `publico`
- `privado`

### Validações de ID

- Todos os IDs devem ser ObjectIds válidos do MongoDB (24 caracteres hexadecimais)
- IDs inválidos retornam erro 404 (Not Found)
- Exemplo de ID válido: `507f1f77bcf86cd799439011`
- Exemplo de ID inválido: `69169bc841e8d2738365f86` (23 caracteres)

### Validações de Campos

**Pontos de Descarte:**
- `nome`: obrigatório, string
- `bairro`: obrigatório, string
- `tipoLocal`: obrigatório, enum ('publico' | 'privado')
- `categoriasResiduos`: obrigatório, array de strings
- `geolocalizacao.latitude`: obrigatório, number
- `geolocalizacao.longitude`: obrigatório, number

**Descartes:**
- `nomeUsuario`: obrigatório, string
- `pontoDescarteId`: obrigatório, string (ObjectId válido)
- `tipoResiduo`: obrigatório, enum (ver [Tipos de Resíduo](#tipos-de-resíduo))
- `data`: opcional, Date (padrão: data atual)

---

## 📝 Notas

- Todas as datas são retornadas no formato ISO 8601 (UTC)
- Os filtros de busca são case-insensitive quando aplicável
- O campo `data` nos filtros aceita apenas a data (YYYY-MM-DD), não hora
- IDs inválidos são tratados e retornam 404 em vez de erro de cast
- O relatório calcula estatísticas baseadas em todos os dados cadastrados

---

## 🛠️ Tecnologias Utilizadas

- **NestJS**: Framework Node.js
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM para MongoDB
- **TypeScript**: Linguagem de programação
