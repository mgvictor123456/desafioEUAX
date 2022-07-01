exports.up = function(knex) {
    return knex.schema.createTable('atividades', function(table) {
        table.increments('idAtividade');
        table.integer('idProjetoAtividade').unsigned().references('idProjeto').inTable('projetos').onDelete('CASCADE');
        table.text('nomeAtividade').notNullable();
        table.date('dataInicioAtividade');
        table.date('dataFimAtividade');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('atividades');
};
