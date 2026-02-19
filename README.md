# Oasis Social

Oasis Social é uma rede social focada em positividade e conexão entre pessoas. Este projeto foi desenvolvido como um exercício acadêmico para demonstrar habilidades de desenvolvimento web full-stack usando Node.js e PostgreSQL.

## Funcionalidades

- **Autenticação de Usuário**: Sistema seguro de registro e login usando senhas criptografadas.
- **Feed**: Visualize postagens de todos os usuários em um feed cronológico.
- **Gerenciamento de Postagens**: Usuários podem criar, editar e excluir suas próprias postagens.
- **Perfil**: Lógica básica de perfil de usuário.
- **Design Responsivo**: Interface moderna e limpa construída com Bootstrap 5 e CSS personalizado.

## Tecnologias Utilizadas

- **Backend**: Node.js com framework Fastify.
- **Banco de Dados**: PostgreSQL com driver `pg`.
- **Frontend**: EJS (Embedded JavaScript templating), HTML5, CSS3, Bootstrap 5.
- **Autenticação**: Bcrypt para hash de senhas, cookies de sessão seguros.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes requisitos:

- Node.js (v18 ou superior)
- Banco de dados PostgreSQL
- npm (Node Package Manager)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/CaueFoyth/oasis-social.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd oasis-social
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração

1. Crie um arquivo `.env` no diretório raiz do projeto.
2. Adicione as seguintes variáveis de ambiente:

   ```env
   DATABASE_URL=postgres://usuario:senha@localhost:5432/oasis_social
   COOKIE_SECRET=sua_chave_secreta_segura_com_pelo_menos_32_caracteres
   ```

   Substitua `usuario`, `senha`, e `oasis_social` com suas credenciais reais do banco de dados.
   Substitua `sua_chave_secreta...` com uma string aleatória forte para assinar cookies.

## Configuração do Banco de Dados

Execute os seguintes comandos SQL no seu banco de dados PostgreSQL para criar as tabelas necessárias:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    content TEXT NOT NULL,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Executando a Aplicação

Para iniciar o servidor em modo de desenvolvimento (com recarregamento automático):

```bash
npm run dev
```

Para iniciar o servidor em modo de produção:

```bash
npm start
```

A aplicação estará disponível em: `http://localhost:3000`

## Estrutura do Projeto

- `src/`: Contém o código fonte do backend (configuração do servidor, rotas, lógica do banco de dados).
- `views/`: Templates EJS para as páginas do frontend.
- `public/`: Arquivos estáticos (CSS, imagens).
- `server.js`: Ponto de entrada da aplicação.

## Licença

Este projeto está licenciado sob a Licença ISC.