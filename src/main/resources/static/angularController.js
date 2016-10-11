
angular.module("TF", []).controller('myCtrl', function($scope) {
    $scope.taskTitle = "Task Title";
    $scope.taskTypes = ["Objective","Epic","Story","Sub-task","Float","Sub-float"];
    $scope.taskType = $scope.taskTypes[2];
    var i = 2;
    $scope.fibionacciSeries = [1,2,3,5,8,13];
    $scope.storyPoints = $scope.fibionacciSeries[i];

    $scope.incrementStoryPoints = function(){
        if(i <= 4){
            i = i + 1;
        }
        $scope.storyPoints = $scope.fibionacciSeries[i];
    }

    $scope.decrementStoryPoints = function(){
        if(i >= 1){
            i= i - 1;
        }
        $scope.storyPoints = $scope.fibionacciSeries[i];
    }




});//for taskFunnel.controller