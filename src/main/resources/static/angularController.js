
angular.module("TF", []).controller('myCtrl', function($scope) {
    $scope.taskTitle = "Task Title";
    $scope.taskTypes = ["Objective","Epic","Story","Sub-task","Float","Sub-float"];
    $scope.taskType = $scope.taskTypes[2];






});//for taskFunnel.controller