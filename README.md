# Jr.Stock 🚀

Sistema de gerenciamento de estoque profissional desenvolvido com Node.js e Nuxt.js.

## 🏗️ Arquitetura de Software

O projeto utiliza uma **Arquitetura em Camadas (N-Tier Architecture)**, focada em separação de responsabilidades, manutenibilidade e escalabilidade.

### Camadas do Backend:

1.  **Routes**: Gerenciamento modular de rotas por entidade.
2.  **Middlewares**: Camada de interceptação (Autenticação JWT, Tratamento de Erros).
3.  **Requests (Validation Layer)**: Validação rigorosa de dados de entrada utilizando **Yup**. Nenhum dado inválido chega à Controller.
4.  **Controllers**: Atuam como orquestradores, recebendo a requisição e chamando os serviços necessários.
5.  **Services (Business Logic Layer)**: Contém toda a regra de negócio e lógica de persistência. Isola o banco de dados do resto da aplicação.
6.  **DTOs (Data Transfer Objects)**: Padronização e segurança no tráfego de dados entre o servidor e o cliente.
7.  **Models (Data Access Layer)**: Abstração do banco de dados utilizando **Sequelize (ORM)**.
8.  **Gates (Authorization Layer)**: Sistema de permissões granular para controle de acesso baseado em cargos (RBAC).
9.  **Logs**: Sistema de log profissional utilizando **Winston**, com persistência em arquivos para auditoria e debug.

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js, Express, Sequelize (MySQL), Winston (Logs), Yup (Validation), JWT (Auth).
- **Frontend**: Nuxt.js, Vue.js, TailwindCSS.
- **Testes**: Vitest (Testes Unitários).

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado
- MySQL rodando

### Backend
1. Entre na pasta `backend`: `cd backend`
2. Instale as dependências: `npm install`
3. Configure o `.env` com suas credenciais do banco.
4. Inicie o servidor: `npm start` (ou `node server.js`)

### Frontend
1. Entre na pasta `frontend`: `cd frontend`
2. Instale as dependências: `npm install`
3. Inicie o projeto: `npm run dev`

### Docker (Recomendado)
Para rodar todo o ecossistema (Banco + Back + Front) com apenas um comando e isolamento de rede:
```bash
docker-compose up --build
```
*O acesso será restrito ao seu localhost (127.0.0.1) por questões de segurança.*

## 🧪 Testes
Para rodar os testes unitários do backend:
```bash
cd backend
npm test
```

---
Desenvolvido por [Marcelo Ferreira Campos](https://github.com/marceloferreiracampos07)
