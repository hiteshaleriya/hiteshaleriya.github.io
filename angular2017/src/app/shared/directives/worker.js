(function() {
    angular.module('portal')
        .directive('worker', function() {

            var directive = {
                restrict: 'E',
                replace: true,
                scope: {
                    record: '='
                },
                template: '<div class="worker">\
                    <strong data-ng-bind="record.name"></strong>\
                    <span data-ng-bind="record.mobileNumber" class="right"></span>\
                    <div class="status" ng-class="{busy: record.taskAssigned}">{{record.taskAssigned || "Available"}}</span>\
                    </div>'
            };

            return directive;
        });
}());
