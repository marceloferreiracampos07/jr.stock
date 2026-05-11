# Jr.Stock 🚀

Sistema de gerenciamento de estoque profissional desenvolvido com **Node.js** e **Nuxt.js**.

## 🏗️ Arquitetura de Software

O projeto utiliza uma **Arquitetura em Camadas (N-Tier Architecture)**, refatorada para utilizar **Injeção de Dependência** nos serviços, promovendo alta testabilidade e baixo acoplamento.

### Camadas do Backend:

1.  **Routes**: Gerenciamento modular de rotas.
2.  **Middlewares**: Interceptação global (Auth JWT, Error Handling).
3.  **Requests (Validation Layer)**: Validação de dados com **Yup**.
4.  **Controllers**: Orquestradores de requisições.
5.  **Services (Business Logic Layer)**: Lógica de negócio com injeção de dependência via construtor.
6.  **DTOs (Data Transfer Objects)**: Formatação e segurança no tráfego de dados.
7.  **Models (Data Access Layer)**: Abstração de banco de dados com **Sequelize**.
8.  **Gates (Authorization Layer)**: Controle de acesso granular (RBAC) com testes unitários.
9.  **Logs**: Registro profissional de atividades com **Winston**.

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js, Express, Sequelize, MySQL, Winston, Yup, JWT.
- **Frontend**: Nuxt.js (Vue 3), TailwindCSS.
- **Testes**: Vitest (Unitários e TDD).
- **Infraestrutura**: Docker & Docker Compose.

## 🚀 Como Executar com Docker (Recomendado)

O projeto está totalmente containerizado para facilitar a execução e garantir a segurança.

1. **Subir o ambiente completo**:
   ```bash
   docker compose up -d --build
   ```
2. **Acesso**:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend**: [http://localhost:3333](http://localhost:3333)
   - **Banco de Dados**: Porta `3306` (Acesso restrito a `127.0.0.1` para segurança).

3. **Redes Isoladas**:
   - `internal_net`: Comunicação privada entre Back-end e MySQL.
   - `external_net`: Comunicação entre Front-end, Back-end e Usuário.

## 🧪 Testes Unitários e TDD

O projeto adota a metodologia **TDD (Test-Driven Development)**, garantindo alta cobertura e estabilidade nas novas funcionalidades:

```bash
cd backend
npm test
```
Todas as novas funcionalidades (ex: `registrarSaida`) são implementadas respeitando o ciclo **Red-Green-Refactor**. A camada de serviços foi desacoplada utilizando injeção de dependência para permitir mocks isolados.

## 🧹 Clean Code
O código foi refatorado para remover comentários desnecessários, tornando-o autodocumentado e seguindo as melhores práticas da indústria.

---
Desenvolvido por [Marcelo Ferreira Campos](https://github.com/marceloferreiracampos07)
