var app = angular.module('baseApp', ['chart.js']);

app.controller('mainController', [
    "$scope",
	"$http",
    "getProjetos",
    "getAtividades",
    function(
        $scope,
        $http,
        getProjetos,
        getAtividades
    ) {


        /** Inicialização de variáveis */
        $scope.project_names = [];
        $scope.projects_json = [];
        $scope.activities_json = [];
        $scope.selected = 0;
        $scope.loadingActivity = false;

        /** Modais */
        $scope.deleteProjectModal = function(idProjeto) {
            $scope.projectId = projectId;
            $("#delete-project-modal").modal("show");
        };
        $scope.addProjectsModal = function() {
            $("#add-project-modal").modal("show");
        };
        $scope.addActivitiesModal = function(idProjetoAtividade) {
            $scope.idProjetoAtividade = idProjetoAtividade;
            $("#add-activity-modal").modal("show");
        };

        /** Eventos */
        $scope.deleteProject = function(idProjeto, e) {
            
            e.preventDefault();

            $http({
                method: "DELETE",
                url: "http://localhost:3333/projects/"+projectId,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(function(result) {
                $("#delete-project-modal").modal("hide");
                $scope.getProjetos();
            });
            return false;
        };
        $scope.finishActivity = function(idAtividade) {          
            $http({
                method: "PUT",
                url: "http://localhost:3333/activities/"+idAtividade,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(function(result) {
                $scope.getProjetos();
            });
            return false;
        };
        $scope.addProject = function(e) {
            const nomeProjeto = $scope.nomeProjeto;
            const dataInicioProjeto = new Date($scope.dataInicioProjeto).toJSON().slice(0, 10);
            const dataFimProjeto = new Date($scope.dataFimProjeto).toJSON().slice(0, 10);

            e.preventDefault();

            obj = {
                nomeProjeto,
                dataInicioProjeto,
                dataFimProjeto
            };
            $http({
                method: "POST",
                url: "http://localhost:3333/projects",
                data: obj,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(function(result) {
                if(result.status == 201) {
                    $("#add-project-modal").modal("hide");
                    $scope.getProjetos();
                }
            });
            
            $scope.nomeProjeto = "";
            $scope.dataInicioProjeto = "";
            $scope.dataFimProjeto = "";
            return false;
        };
        $scope.addActivity = function(e) {
            const nomeAtividade = $scope.nomeAtividade;
            const dataInicioAtividade = new Date($scope.dataInicioAtividade).toJSON().slice(0, 10);
            const dataFimAtividade = new Date($scope.dataFimAtividade).toJSON().slice(0, 10);
            const idProjetoAtividade = $scope.idProjetoAtividade;
            
            e.preventDefault();

            obj = {
                idProjetoAtividade,
                nomeAtividade,
                dataInicioAtividade,
                dataFimAtividade,
                activity_finished: false
            };
            $http({
                method: "POST",
                url: "http://localhost:3333/activities",
                data: obj,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(function(result) {
                $("#add-activity-modal").modal("hide");
                $scope.getProjetos();
                
            });
            
            $scope.nomeAtividade = "";
            $scope.dataInicioAtividade = "";
            $scope.dataFimAtividade = "";
            return false;
        };

        /** Requisições */
        $scope.getProjetos = function() {
            
            $scope.late_projects = 0;
            $scope.on_time_projects = 0;

            let late_projects = 0;
            let on_time_projects = 0;

            var projects = getProjects.getData();
            projects.then(function(result) {
                $scope.projects_json = result;
                
                if($scope.projects_json.length != 0) {
                    $scope.getAtividades($scope.projects_json[0].projectId);
                    $scope.projectId, $scope.selected = $scope.projects_json[0].projectId;
                }
                angular.forEach(
                    $scope.projects_json, function(itm) {
                        $scope.project_names.push(itm.projectName);
                        if(itm.latestActivity.dataFimAtividade > itm.dataFimProjeto) {
                            late_projects++;
                        } else {
                            on_time_projects++;
                        }
                    }
                );
                $scope.late_projects = Math.floor((late_projects / $scope.projects_json.length) * 100);
                $scope.on_time_projects = Math.floor((on_time_projects / $scope.projects_json.length) * 100);

                $scope.labels = ['Atrasados', 'No Prazo'];
                $scope.data = [$scope.late_projects, $scope.on_time_projects];
            });
        };
        $scope.getProjetos();
        $scope.getAtividades = function(id) {
            $scope.loadingActivity = true;
            $scope.projectId = id;
            $scope.selected = id;

            var activity = getActivities.getData(id);
            activity.then(function(result) {
                $scope.activities_json = result;
                $scope.loadingActivity = false;
                
            });
        }
    }
]);