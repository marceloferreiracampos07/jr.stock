# Jr.Stock 🚀

Sistema de gerenciamento de estoque profissional desenvolvido com **Node.js** e **Nuxt.js**.

## 🏗️ Arquitetura de Software: Resource-Based Clean Architecture

O projeto foi totalmente refatorado para uma **Arquitetura Limpa Baseada em Recursos (Resource-Based Clean Architecture)**, aplicando rigorosamente os princípios **SOLID** e **Injeção de Dependência**.

### Camadas do Backend (`src/`):

1.  **Modules (`/modules`)**: Camada central organizada por recursos (Usuários, Produtos, etc.).
    -   **Domain**: Regras de negócio puras e Casos de Uso (`use_cases`).
    -   **Adapters**: Adaptadores de entrada e saída.
        -   **Controllers**: Orquestradores de entrada.
        -   **Repositories**: Abstração do banco de dados (Sequelize), desacoplando o domínio da infraestrutura.
        -   **DTOs**: Formatação e transformação de dados.
        -   **Validations**: Esquemas de validação (Yup).
    -   **Routes**: Definição modular das rotas do recurso com injeção de dependência manual.

2.  **Infrastructure (`/infrastructure`)**: Detalhes técnicos e ferramentas externas.
    -   **Web**: Configuração global do Express e Middlewares (Auth JWT, Error Handling).
    -   **Database**: Conexão e Definições de Modelos do Sequelize.
    -   **Security**: Controle de acesso granular (Gates/ACL).
    -   **Config**: Configurações de ferramentas como Logs (Winston).

### Princípios SOLID Aplicados:
- **SRP**: Cada classe tem uma única responsabilidade (ex: Repositórios apenas para dados, Services apenas para lógica).
- **OCP**: O sistema é aberto para extensão (ex: novos repositórios de cache) e fechado para modificação.
- **LSP**: Substituição de implementações sem quebrar o sistema através de contratos claros.
- **ISP**: Módulos consomem apenas o que necessitam.
- **DIP**: Inversão de dependência através de construtores, garantindo que a regra de negócio não dependa de bibliotecas externas (como Sequelize).

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js, Express, Sequelize, MySQL, Winston, Yup, JWT.
- **Frontend**: Nuxt.js (Vue 3), TailwindCSS.
- **Testes**: Vitest (Unitários, Integração e TDD).
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

## 🧪 Testes Unitários e TDD

O projeto adota a metodologia **TDD (Test-Driven Development)**, com a camada de serviços totalmente testável isoladamente através de Mocks dos repositórios:

```bash
cd backend
npm test
```

---
Desenvolvido por [Marcelo Ferreira Campos](https://github.com/marceloferreiracampos07)
