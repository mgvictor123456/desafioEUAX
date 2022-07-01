module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'Projetos',
      user: 'postgres',
      password: 'Nathalia3470.'
    },
    migrations: {
      tableName: 'knex_migratinpons',
      directory: `${__dirname}/src/database/migrations`
    }
  }
};
