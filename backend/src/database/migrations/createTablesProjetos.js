exports.up = function(knex) {
    return knex.schema.createTable('projetos', function(table) {
        table.increments('idProjeto');
        table.text('nomeProjeto').notNullable();
        table.date('dataInicioProjeto');
        table.date('dataFimProjeto');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('projetos');
};
