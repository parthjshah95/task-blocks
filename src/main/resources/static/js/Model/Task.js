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


    function createId(arg){
        var type = typeof arg === "string"? arg: taskTypes[arg];
        //If string, it is the type. otherwise, it is assumed to be an int - the index of the type
        if(typeof allTasks[type] === "undefined") return (type + "0");
        else return (type + (allTasks[type]).length.toString());
    }

}