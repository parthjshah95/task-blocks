
angular.module("TF", []).controller('myCtrl', function($scope, $http) {
    $scope.taskTitle = "Task Title";
    $scope.taskTypes = ["Objective","Epic","Story","Sub-task","Float","Sub-float"];
    var taskTypeCodes = ["OBJV"/*0*/,"EPIC"/*1*/,"STRY"/*2*/,"SUBT"/*3*/,"FLOT"/*4*/,"SBFT"/*5*/];
    var stList = ["Parked","To Do","In Progress","Done"];//list of possible statuses
    var s = 0; // pointer to dropdown options of stList
    $scope.status = stList[s];
    var allTasks = [];
    var objectives = [];
    var epics = [];
    var stories = [];
    var subtasks = [];
    var floats = [];
    var subfloats = [];

    function classifyTask(task,index){
        var type = task.id.substr(0,4);//substr(fromIndex, number of characters)
        switch(type){
            case taskTypeCodes[0]:
                var i = objectives.length;
                objectives [i] = task;
                break;
            case taskTypeCodes[1]:
                var i = epics.length;
                epics [i] = task;
                break;
            case taskTypeCodes[2]:
                var i = stories.length;
                stories [i] = task;
                break;
            case taskTypeCodes[3]:
                var i = subtasks.length;
                subtasks [i] = task;
                break;
            case taskTypeCodes[4]:
                var i = floats.length;
                floats [i] = task;
                break;
            case taskTypeCodes[5]:
                var i = subfloats.length;
                subfloats [i] = task;
                break;
        }
    }
    function classifyTasks(){
        allTasks.forEach(classifyTask);
    }

    $scope.getAllTasks = function(){
        $http({
            url:'/allTasks',
            method:'GET'
        }).then(function successCallback(response){
                allTasks = response.data;
                classifyTasks();
                alert(JSON.stringify(allTasks));
                alert(JSON.stringify(objectives));
            },function errorCallback(response){
                alert(JSON.stringify(response));
            })
    }

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
        var id = "";
        switch(type){
            case taskTypes[0]:
                var p = taskTypeCodes[0];
                var q = objectives.length + 1;
                id = p + q.toString();
                break;
            case taskTypes[1]:
                var p = taskTypeCodes[1];
                var q = epics.length + 1;
                id = p + q.toString();
                break;
            case taskTypes[2]:
                var p = taskTypeCodes[2];
                var q = stories.length + 1;
                id = p + q.toString();
                break;
            case taskTypes[3]:
                var p = taskTypeCodes[3];
                var q = subtasks.length + 1;
                id = p + q.toString();
                break;
            case taskTypes[4]:
                var p = taskTypeCodes[4];
                var q = floats.length + 1;
                id = p + q.toString();
                break;
            case taskTypes[5]:
                var p = taskTypeCodes[5];
                var q = subfloats.length + 1;
                id = p + q.toString();
                break;
        }
        return id;
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
        $scope.getAllTasks();

    }


});