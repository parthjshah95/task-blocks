
angular.module("TF", []).controller('myCtrl', function($scope) {
    $scope.taskTitle = "Task Title";
    $scope.taskTypes = ["Objective","Epic","Story","Sub-task","Float","Sub-float"];
    $scope.taskType = $scope.taskTypes[2];
    var fibionacciSeries = [1,2,3,5,8,13];
    $scope.storyPoints = fibionacciSeries[2];






});//for taskFunnel.controller