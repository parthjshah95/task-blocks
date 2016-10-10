
angular.module("TF", []).controller('myCtrl', function($scope) {
    $scope.taskTitle = "Task Title";
    $scope.taskTypes = ["Objective","Epic","Story","sub-task"];
    $scope.taskType = $scope.taskTypes[0];






});//for taskFunnel.controller