angular.module("TF", []).controller('myCtrl', function($scope, $http) {

    $scope.taskTitle = "Task Title";
    $scope.taskTypes = ["Objective","Epic","Story","Sub-task","Float","Sub-float"];
    var level = 2;
    $scope.taskType = $scope.taskTypes[level];
    var taskTypeCodes = ["OBJV"/*0*/,"EPIC"/*1*/,"STRY"/*2*/,"SUBT"/*3*/,"FLOT"/*4*/,"SBFT"/*5*/];
    var stList = ["Parked","To Do","In Progress","Done"];//list of possible statuses
    var s = 0; // pointer to dropdown options of stList
    $scope.status = stList[s];
    var i = 2;
    var fibonacciSeries = [1,2,3,5,8,13];
    $scope.storyPoints = fibonacciSeries[i];
    $scope.description = "";


    $scope.allTasks = [];
    $scope.objectives = [];
    $scope.epics = [];
    $scope.stories = [];
    $scope.subtasks = [];
    $scope.floats = [];
    $scope.subfloats = [];

    $scope.getAllTasks();

    var currentTask = {};
    function initializeCurrentTask(){
        currentTask.id = createId($scope.taskType);
        currentTask.title = $scope.taskTitle;//this needs updates
        currentTask.type = $scope.taskType;//this needs updates
        currentTask.parent = "something";
        currentTask.children = "something";
        currentTask.associates = "something";//TODO change placeholder
        currentTask.points = $scope.storyPoints;//this needs updates
        currentTask.description = $scope.description;//this needs updates
        currentTask.status = $scope.status;//this needs updates
        currentTask.sprints = sprintList;//TODO change placeholder
        currentTask.estimateOfTime = "something";//TODO change placeholder
        currentTask.deadline = "something";//TODO change placeholder
    }


    function updateCurrentTask(){
        currentTask.title = $scope.taskTitle;
        currentTask.type = $scope.taskType;
        currentTask.points = $scope.storyPoints;
        currentTask.description = $scope.description;
        currentTask.status = $scope.status;
    }

    /*$scope.newChild = function(){
        level += 1;
        $scope.taskType = $scope.taskTypes[level];
        id = createId($scope.taskType);

    }*/

    function classifyTask(task,index){
        var type = task.id.substr(0,4);//substr(fromIndex, number of characters)
        switch(type){
            case taskTypeCodes[0]:
                var i = $scope.objectives.length;
                $scope.objectives [i] = task;
                break;
            case taskTypeCodes[1]:
                var i = $scope.epics.length;
                $scope.epics [i] = task;
                break;
            case taskTypeCodes[2]:
                var i = $scope.stories.length;
                $scope.stories [i] = task;
                break;
            case taskTypeCodes[3]:
                var i = $scope.subtasks.length;
                $scope.subtasks [i] = task;
                break;
            case taskTypeCodes[4]:
                var i = $scope.floats.length;
                $scope.floats [i] = task;
                break;
            case taskTypeCodes[5]:
                var i = $scope.subfloats.length;
                $scope.subfloats [i] = task;
                break;
        }
    }
    function classifyTasks(){
        $scope.allTasks.forEach(classifyTask);
    }

    $scope.getAllTasks = function(){
        $http({
            url:'/allTasks',
            method:'GET'
        }).then(function successCallback(response){
                $scope.allTasks = response.data;
                classifyTasks();
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


    $scope.incrementStoryPoints = function(){
        if(i <= 4){
            i = i + 1;
        }
        $scope.storyPoints = fibonacciSeries[i];
    }

    $scope.decrementStoryPoints = function(){
        if(i >= 1){
            i= i - 1;
        }
        $scope.storyPoints = fibonacciSeries[i];
    }

    var sprintList = [];
    $scope.showJson = function(){
        alert(JSON.stringify($scope.createJson()));
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
        updateCurrentTask();
        $http({
            url: '/save',
            method: 'POST',
            data: currentTask
        }).then(function successCallback(response) {
               // this callback will be called asynchronously
               // when the response is available
               alert(JSON.stringify(response.data));
               $scope.getAllTasks();
             }, function errorCallback(response) {
               // called asynchronously if an error occurs
               // or server returns response with an error status.
               alert(JSON.stringify(response.data));
             });
    }
});