angular.module('portal')
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'src/app/components/portal/portal.html',
                controller: 'PortalController'
            })
    });
