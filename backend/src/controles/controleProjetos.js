const knex = require('../database');

module.exports = {
    async index(request, response) {
        const results = await knex('projetos');


        for (let i = 0; i < results.length; i++) {

            const [activities_biggest_date] = await knex('atividades').where('idProjetoAtividade', results[i].projectId).orderBy('dataFimAtividade', 'desc');


            const [activities_finished] = await knex('atividades').where('idProjetoAtividade', results[i].projectId).count();
            const {count: finished} = activities_finished;

            const [activities_total] = await knex('atividades').where('idProjetoAtividade', results[i].projectId).count();
            let {count: total} = activities_total;

            if(total == 0) {
                total = 1;
            }

            const percentage = Math.floor((finished / total) * 100);
            results[i].percentage = percentage;
            if(activities_biggest_date) {
                results[i].latestActivity = activities_biggest_date;
            } else {
                results[i].latestActivity = [];
            }

        }

        return response.json(results);
    },
    async create(request, response, next) {  
        try {
            const {projectName, projectStartDate, projectEndDate } = request.body;
    
            await knex('projetos').insert({
                projectName,
                projectStartDate,
                projectEndDate
            });  
            return response.status(201).send();
        } catch (error) {
            next(error);
        }
    },
    async delete(request, response, next) {
        try {
            const { id } = request.params;
            
            await knex('projetos')
            .where({ projectId: id });

            return response.send();
        } catch (error) {
            next(error);
        }
    }
};