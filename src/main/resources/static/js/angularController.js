angular.module("TF", []).controller('myCtrl', function($scope, $http) {

    const stList = ["Parked","To Do","In Progress","Done"];//list of possible statuses
    const taskTypes = ["Objective","Epic","Story","Sub-task","Float","Sub-float"];
    const fibonacciSeries = [1,2,3,5,8,13];

    function createId(arg){
        var type = typeof arg === "string"? arg: taskTypes[arg];
        //If string, it is the type. otherwise, it is assumed to be an int - the index of the type
        if(typeof allTasks[type] === "undefined") return (type + "0");
        else return (type + (allTasks[type]).length.toString());
    }

    function Task(args){
        if(typeof args === "undefined"){
            this.id = createId(0);
            this.type = taskTypes[0];
            this.title = "title";
            this.parent = {};
            this.children = [];
            this.associates = [];
            this.points = "NA";
            this.description = "description";
            this.status = stList[0];
            this.sprints = [];
            this.estimateOfTime = {};
            this.deadline = {};
        } else if (typeof args === "object"){
            var task = new Task();
            Object.keys(args).forEach(function(key){
                task[key] = args[key];
            });
            return task;
        } else if (typeof args === "number"){
            //if task is an objective or epic, points are not applicable
            var points = args > 1? fibonacciSeries[2]: "NA";
            return (new Task({
                "id": createId(args),
                "type": taskTypes[args],
                "points":points
            }));
        }
    }


    var allTasks = [];
    $scope.task = new Task();

    (function getAllTasks(){
        $http({
            url:'/allTasks',
            method:'GET'
        }).then(function successCallback(response){
                allTasks = response.data;
                console.log("all tasks: ", allTasks);
            },function errorCallback(response){
                console.log(response);
                alert("could not load your data.\t:(");
            })
    })();


    $scope.newChild = function(){
        var index = taskTypes.indexOf($scope.task.type);
        var child = new Task(index + 1);
        $scope.task.children.push(child.id);
        $scope.task = child;
    }

    $scope.saveTask = function(task){
            $http({
                url: '/save',
                method: 'POST',
                data: task
            }).then(function successCallback(response) {
                   getAllTasks();
                   alert("saved task: ", response.data);
                 }, function errorCallback(response) {
                   alert("sorry, the task could not be saved :(");
                   console.log(response.data);
                 });
    }
/*------------ Old Code below ------------*/

    $scope.statusNext = function(){
        if(s < stList.length) s++;
        $scope.task.status = stList[s];
    }
    $scope.statusPrevious = function(){
        if(s >= 1) s -= 1;
        $scope.task.status = stList[s];
    }


    $scope.incrementStoryPoints = function(){
        if(i <= fibonacciSeries.length) i++;
        $scope.storyPoints = fibonacciSeries[i];
    }

    $scope.decrementStoryPoints = function(){
        if(i >= 1) i--;
        $scope.storyPoints = fibonacciSeries[i];
    }

    var sprintList = [];
    $scope.showJson = function(){
        alert(JSON.stringify($scope.createJson()));
    }

});