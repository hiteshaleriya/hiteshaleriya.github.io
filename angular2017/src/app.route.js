angular.module('portal')
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'src/app/components/portal/portal.html',
                controller: 'PortalController'
            })

        // register the service worker if available
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js').then(function(reg) {
                console.log('Successfully registered service worker', reg);
            }).catch(function(err) {
                console.warn('Error whilst registering service worker', err);
            });
        }
    });
