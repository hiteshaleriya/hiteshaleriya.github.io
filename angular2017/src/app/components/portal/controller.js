(function() {
    angular.module('portal')
        .controller('PortalController', function($scope, $timeout, Resource) {
            
            $scope.integerReg = /^\d+$/;
            $scope.record = null;
            $scope.isActive = false;
            $scope.form = {
                taskAssigned: '',
                taskDuration: ''
            };

            Resource.workers().then(function(res) {
                $scope.workers = res.data.workers;
            }, function(err) {
                console.log(err);
            });

            function clearRecords() {
                $scope.record = null;
            }

             /**
              * [onSelectingWorker executes when worker is clicked]
              * @param  {[type]} record [worker object i.e., record]
              * @return {[type]}        [description]
              */
            $scope.onSelectingWorker = function(record) {
                $scope.isActive = 'active' + this.$index;
                // checking if worker is already occupied or not
                if (record && record.taskDuration > 0) {
                    clearRecords();
                    return;
                }
                $scope.record = record;
            };
            
            /**
             * [assignTask is assigning task to the worker]
             * @param  {Boolean} isValid [flag tells is form valid]
             * @return {[type]}          [description]
             */
            $scope.assignTask = function(isValid) {
                if (isValid) {
                    angular.extend($scope.record, $scope.form);
                    $scope.startWorking($scope.record);
                    clearRecords();
                    $scope.form.taskAssigned = '';
                    $scope.form.taskDuration = '';
                }
            };          
            
            /**
             * [startWorking is engaging user for given time]
             * @param  {[type]} record [worker object i.e., record]
             * @return {[type]}        [description]
             */
            $scope.startWorking = function(record) {
                if (record && record.taskDuration) {
                    // conversion from seconds to millis
                    var durationInMillis = parseInt(record.taskDuration || 0, 10) * 1000;
                    $timeout(function() {
                        console.log("task completed...");
                        record.taskDuration = 0;
                        record.taskAssigned = '';
                    }, durationInMillis)
                }
            }

        });
}());
