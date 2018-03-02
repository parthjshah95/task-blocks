angular.module("TF", []).controller('myCtrl', function($scope, $http) {

    $scope.parent = "root";
    $scope.taskTitle = "Task Title";
    var taskTypes = ["Objective","Epic","Story","Sub-task","Float","Sub-float"];
    var level = 0;
    $scope.taskType = taskTypes[level];
    var taskTypeCodes = ["OBJV"/*0*/,"EPIC"/*1*/,"STRY"/*2*/,"SUBT"/*3*/,"FLOT"/*4*/,"SBFT"/*5*/];
    var stList = ["Parked","To Do","In Progress","Done"];//list of possible statuses
    var s = 0; // pointer to dropdown options of stList
    $scope.status = stList[s];
    var i = 2;
    var fibonacciSeries = [1,2,3,5,8,13];
    $scope.storyPoints = fibonacciSeries[i];
    $scope.description = "Description";


    $scope.allTasks = [];
    $scope.objectives = {};
    $scope.epics = {};
    $scope.stories = {};
    $scope.subtasks = {};
    $scope.floats = {};
    $scope.subfloats = {};

    var currentTask = {};
    var parentTask = {};
    var saveParent = false;

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

    $scope.getAllTasks();
    initializeCurrentTask();

    function newTask(){
        currentTask.id = createId($scope.taskType);
        currentTask.title = "Task Title";//this needs updates
        currentTask.type = $scope.taskType;
        i = 2;
        currentTask.points = fibonacciSeries[i];
        currentTask.description = "Description";
        var s = 0;
        currentTask.status =  stList[s];
        currentTask.sprints = sprintList;//TODO change placeholder
        currentTask.estimateOfTime = "something";//TODO change placeholder
        currentTask.deadline = "something";//TODO change placeholder
    }


    function initializeCurrentTask(){
        currentTask.id = createId($scope.taskType);
        currentTask.title = "Task Title";//this needs updates
        currentTask.type = $scope.taskType;//this needs updates
        currentTask.parent = "root";
        currentTask.children = [];
        currentTask.points = $scope.storyPoints;//this needs updates
        currentTask.description = $scope.description;//this needs updates
        currentTask.status = $scope.status;//this needs updates
        currentTask.sprints = sprintList;//TODO change placeholder
        currentTask.estimateOfTime = "something";//TODO change placeholder
        currentTask.deadline = "something";//TODO change placeholder
    }

    function updateScopes(){
        $scope.taskTitle = currentTask.title;
        $scope.taskType = currentTask.type;
        $scope.storyPoints = currentTask.points;
        $scope.description = currentTask.description;
        $scope.status = currentTask.status;
        $scope.children = currentTask.children;
        $scope.parent  = currentTask.parent;
    }

    function updateCurrentTask(){
        currentTask.title = $scope.taskTitle;
        currentTask.type = $scope.taskType;
        currentTask.points = $scope.storyPoints;
        currentTask.description = $scope.description;
        currentTask.status = $scope.status;
    }

    $scope.newChild = function(){
        parentTask = JSON.parse(JSON.stringify(currentTask));
        alert(parentTask.title);
        alert(currentTask.title);
        if(level < 3){
            level += 1;
        }
        else if(level == 4){
            level +=1;
        }
        $scope.taskType = taskTypes[level];
        newTask();
        alert(currentTask.title);
        alert(parentTask.title);
        parentTask.children.push(currentTask.id);
        currentTask.parent = parentTask.id;
        updateScopes();
        alert(currentTask.title);
        alert(parentTask.title);
        saveParent = true;
    }

    $scope.newObjective = function(){
        $scope.taskType = taskTypes[0];
        $scope.taskTitle = "Task Title";
        initializeCurrentTask();
        updateScopes();
    }

    $scope.newFloat = function(){
        $scope.taskType = taskTypes[4];
        $scope.taskTitle = "Task Title";
        initializeCurrentTask();
        updateScopes();
    }

    function classifyTask(task,index){
        var type = task.id.substr(0,4);//substr(fromIndex, number of characters)
        switch(type){
            case taskTypeCodes[0]:
                $scope.objectives[task.id] = task;
                break;
            case taskTypeCodes[1]:
                $scope.epics[task.id] = task;
                break;
            case taskTypeCodes[2]:
                $scope.stories[task.id] = task;
                break;
            case taskTypeCodes[3]:
                $scope.subtasks[task.id] = task;
                break;
            case taskTypeCodes[4]:
                $scope.floats[task.id] = task;
                break;
            case taskTypeCodes[5]:
                $scope.subfloats[task.id] = task;
                break;
        }
    }
    function classifyTasks(){
        $scope.allTasks.forEach(classifyTask);
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
                var q = Object.keys($scope.objectives).length + 1;
                id = p + q.toString();
                break;
            case taskTypes[1]:
                var p = taskTypeCodes[1];
                var q = Object.keys($scope.epics).length + 1;
                id = p + q.toString();
                break;
            case taskTypes[2]:
                var p = taskTypeCodes[2];
                var q = Object.keys($scope.stories).length + 1;
                id = p + q.toString();
                break;
            case taskTypes[3]:
                var p = taskTypeCodes[3];
                var q = Object.keys($scope.subtasks).length + 1;
                id = p + q.toString();
                break;
            case taskTypes[4]:
                var p = taskTypeCodes[4];
                var q = Object.keys($scope.floats).length + 1;
                id = p + q.toString();
                break;
            case taskTypes[5]:
                var p = taskTypeCodes[5];
                var q = Object.keys($scope.subfloats).length + 1;
                id = p + q.toString();
                break;
        }
        return id;
    }

    $scope.updateCurrentTaskById = function(taskId){
        saveParent == false;
        var type = taskId.substr(0,4);//substr(fromIndex, number of characters)
        switch(type){
            case taskTypeCodes[0]:
                currentTask = $scope.objectives[taskId];
                break;
            case taskTypeCodes[1]:
                currentTask = $scope.epics[taskId];
                break;
            case taskTypeCodes[2]:
                currentTask = $scope.stories[taskId];
                break;
            case taskTypeCodes[3]:
                currentTask = $scope.subtasks[taskId];
                break;
            case taskTypeCodes[4]:
                currentTask = $scope.floats[taskId];
                break;
            case taskTypeCodes[5]:
                currentTask = $scope.subfloats[taskId];
                break;
        }
        updateScopes();
    }

    $scope.getTaskById = function(taskId){
        var returnTask = {};
        var type = taskId.substr(0,4);//substr(fromIndex, number of characters)
        switch(type){
            case taskTypeCodes[0]:
                returnTask = $scope.objectives[taskId];
                break;
            case taskTypeCodes[1]:
                returnTask = $scope.epics[taskId];
                break;
            case taskTypeCodes[2]:
                returnTask = $scope.stories[taskId];
                break;
            case taskTypeCodes[3]:
                returnTask = $scope.subtasks[taskId];
                break;
            case taskTypeCodes[4]:
                returnTask = $scope.floats[taskId];
                break;
            case taskTypeCodes[5]:
                returnTask = $scope.subfloats[taskId];
                break;
        }
        return returnTask;
    }


    $scope.save = function(){
        updateCurrentTask();
        $scope.saveTask(currentTask);
        if(saveParent == true){
            $scope.saveTask(parentTask);
            saveParent == false;
        }
    }

    $scope.saveTask = function(task){
            $http({
                url: '/save',
                method: 'POST',
                data: task
            }).then(function successCallback(response) {
                   // this callback will be called asynchronously
                   // when the response is available
                   $scope.getAllTasks();
                   alert(JSON.stringify(response.data));
                 }, function errorCallback(response) {
                   // called asynchronously if an error occurs
                   // or server returns response with an error status.
                   alert(JSON.stringify(response.data));
                 });
    }
});