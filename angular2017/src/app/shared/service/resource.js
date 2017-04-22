angular.module('portal')
    .factory('Resource', function($http) {

        function workers() {
            return $http.get('src/workers.json');
        }

        return {
            workers: workers
        };
    });
