
angular.module("TF", []).controller('myCtrl', function($scope, $http) {
    $scope.taskTitle = "Task Title";
    $scope.taskTypes = ["Objective","Epic","Story","Sub-task","Float","Sub-float"];
    var stList = ["Parked","To Do","In Progress","Done"];
    var s = 1; // pointer to dropdown options
    $scope.status = stList[s];

    $scope.statusNext = function(){
        if(s <= 2){
            s += 1;
        }
        $scope.status = stList[s];
    }
    $scope.statusPrevious = function(){
        if(s >= 1){
            s -= 1;
        }
        $scope.status = stList[s];
    }
    $scope.taskType = $scope.taskTypes[2];
    var i = 2;
    var fibionacciSeries = [1,2,3,5,8,13];
    $scope.storyPoints = fibionacciSeries[i];
    $scope.description = "description";

    $scope.incrementStoryPoints = function(){
        if(i <= 4){
            i = i + 1;
        }
        $scope.storyPoints = fibionacciSeries[i];
    }

    $scope.decrementStoryPoints = function(){
        if(i >= 1){
            i= i - 1;
        }
        $scope.storyPoints = fibionacciSeries[i];
    }

    var sprintList = [];
    $scope.showJson = function(){
        alert(JSON.stringify($scope.createJson()));
    }

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
        return task;
    }
    function createId(type){
        return "GOAL0002";//TODO take from saved tasks
    }
    //$scope.qtt = function(){alert($scope.taskType)}
    $scope.save = function(){
        var json = $scope.createJson();
        $http({
            url: '/save',
            method: 'POST',
            data: json
        }).then(function successCallback(response) {
               // this callback will be called asynchronously
               // when the response is available
               alert(JSON.stringify(response.data));
             }, function errorCallback(response) {
               // called asynchronously if an error occurs
               // or server returns response with an error status.
               alert(JSON.stringify(response.data));
             });
    }

    $scope.temp = function(){
            $http({
                url: '/temp',
                method: 'GET'
            }).then(function successCallback(response) {
                   // this callback will be called asynchronously
                   // when the response is available
                   alert(JSON.stringify(response.data));
                 }, function errorCallback(response) {
                   // called asynchronously if an error occurs
                   // or server returns response with an error status.
                   alert(JSON.stringify(response.data));
                 });
        }

});//for taskFunnel.controller