# Hello Happy

E-commerce de brinquedos desenvolvido com Spring Boot, PostgreSQL e React.

## Tecnologias

- Java 17
- Spring Boot 3.2.3
- Spring Data JPA / Hibernate
- PostgreSQL
- Maven Wrapper
- React
- Vite

## Rodando no Windows com Docker Desktop

Esse caminho sobe o banco, o ambiente do backend e o ambiente do frontend em containers. Assim, nao e necessario instalar Java, PostgreSQL ou Node diretamente no Windows para desenvolver.

No primeiro uso, o Compose tambem cria a imagem local de desenvolvimento do backend a partir de `.devcontainer/backend/Containerfile`.

### Requisitos

- Docker Desktop instalado e aberto
- Backend WSL 2 habilitado no Docker Desktop
- Git instalado

### Passo a passo

Abra o PowerShell na pasta do projeto e suba os containers:

```powershell
docker compose -f compose.dev.yml up -d db backend frontend
```

Instale as dependencias do frontend:

```powershell
docker compose -f compose.dev.yml exec frontend npm --prefix frontend install
```

Em um terminal, inicie o backend:

```powershell
docker compose -f compose.dev.yml exec backend ./mvnw spring-boot:run
```

Deixe esse terminal aberto. Em outro terminal, inicie o frontend:

```powershell
docker compose -f compose.dev.yml exec frontend npm --prefix frontend run dev
```

Depois acesse:

- Frontend: http://localhost:5173
- Backend/API: http://localhost:8080/api
- PostgreSQL no host: `localhost:5433`
- Banco: `hello_happy`
- Usuario: `hello_happy`
- Senha: `123`

O frontend usa o proxy do Vite para chamar a API do backend pelo caminho `/api`.

### Parar os containers

Para parar os containers sem apagar os dados do banco:

```powershell
docker compose -f compose.dev.yml down
```

Para parar e apagar tambem o volume do banco:

```powershell
docker compose -f compose.dev.yml down -v
```

Use `down -v` somente quando quiser recriar o banco do zero.

## Dev Containers no VS Code

O projeto tem configuracoes em `.devcontainer/` para abrir backend e frontend pela extensao Dev Containers.

No Windows com Docker Desktop, abra a pasta raiz `hello-happy` no VS Code e use:

```text
Dev Containers: Reopen in Container
```

Depois escolha:

- `Hello Happy Backend`
- `Hello Happy Frontend`

Dentro do container backend, inicie a API:

```bash
./mvnw spring-boot:run
```

Dentro do container frontend, inicie o Vite:

```bash
npm --prefix frontend install
npm --prefix frontend run dev
```

## Rodando sem containers no Windows

Tambem e possivel rodar tudo direto na maquina, mas nesse caso voce precisa instalar Java 17, PostgreSQL e Node.js.

1. Crie um banco PostgreSQL chamado `hello_happy`.
2. Ajuste a senha em `src/main/resources/application.properties`, se necessario.
3. Inicie o backend:

```powershell
.\mvnw.cmd spring-boot:run
```

4. Em outro terminal, inicie o frontend:

```powershell
cd frontend
npm install
npm run dev
```

5. Acesse http://localhost:5173.
