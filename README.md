# Desafio Web Developer EUAX
## Instalação de postgresSQL

- Realizar download e instal   através do link https://www.postgresql.org/download/
- Editar a variavel de ambiente PATH com a linhas de comando a seguir como exempli:

```
C:\Program Files\PostgreSQL\14\bin
C:\Program Files\PostgreSQL\14\lib
```

- Os numers devem ser alterados conforma o que esta indicado no seu programa que pode ser virificado após intalação;
- Criar base de dados com os seguintes comando:

```
psql -U postgres
CREATE DATABASE Projetos;
\c Projetos
```

# Para iniciar o Backend

- Instalação das dependencias através de terminal, com os comandos:

```
yarn install
ou
npm install

em seguida

npm install npx

então

npx knex migrate:latest
```
