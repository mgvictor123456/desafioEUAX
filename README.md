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

#Informações Finais


Pela falta de experiência e pouco conhecimento não foi possivel realizar o projeto por completo e de forma utilizável, onde me deparei com varios erros os quais alguns consegui corrigir e outros infelizmnete não fui capaz, mas não é por este movito que não esterei continuando e tentando até que ele funcione, este depoimneto vale apenas para a data final para a entrega do desafio, mas não significa que deixarei por assim mesmo, tive varias dificuldes, bastante ajuda para poder chegar ao ponto que esta neste momento, ajuda de colegas, professores, youtube e varios sites onde outros desenvolvedores deixam seus depoimentos e dificuldades, tudo foi muito novo e realmente um desafio para eu. Busco o conhecimento e o aprendizado pois quando iniciei o desafio não sabia nem ao menos executar os comandos basicos nem realizar as chamadas necessárias para identificar comandos, este desafio realme me fez aprender muito e ainda irei aprender muito com o mesmo e com varios outros
