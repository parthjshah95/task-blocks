
angular.module("TF", []).controller('myCtrl', function($scope, $http) {
    $scope.taskTitle = "Task Title";
    $scope.taskTypes = ["Objective","Epic","Story","Sub-task","Float","Sub-float"];
    $scope.taskType = $scope.taskTypes[2];
    var i = 2;
    $scope.fibionacciSeries = [1,2,3,5,8,13];
    $scope.storyPoints = $scope.fibionacciSeries[i];
    $scope.description = "description";

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

    var sprintList = [];
    $scope.createJson = function(){
        var task = {};
        task.id = createId($scope.taskType);
        task.title = $scope.taskTitle;
        task.type = $scope.taskType;
        task.parent = "something";//TODO change placeholder
        task.children = "something";//TODO change placeholder
        task.associates = "something";//TODO change placeholder
        task.points = $scope.storyPoints;
        task.description = $scope.description;
        task.status = "something";//TODO change placeholder
        task.sprints = sprintList;//TODO change placeholder
        task.estimateOfTime = "something";//TODO change placeholder
        task.deadline = "something";//TODO change placeholder
        alert(JSON.stringify(task));
    }
    function createId(type){
        return "2";
    }
    //$scope.qtt = function(){alert($scope.taskType)}
    /*$scope.save = function(task){
        $http(
            url = '/save',
            method = 'POST',
            data = task
        )
    }*/



});//for taskFunnel.controller