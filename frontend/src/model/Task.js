export default function Task(args){
    function createId(){
        var dateStr = new Date().toString();
        var hash = 0, i, chr;
        if (dateStr.length === 0) return hash;
        for (i = 0; i < dateStr.length; i++) {
            chr   = dateStr.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        hash *= hash;
        hash %= 10000000;
        return hash;
    }

    var statuses = ["Parked","To Do","In Progress","Done"];//list of possible statuses
    this.stList = statuses;
    this.stClasses = ["btn-info", "btn-danger", "btn-warning", "btn-success"];
    var taskTypes = ["Objective","Epic","Story","Sub-task","Float","Sub-float"];
    this.tList = taskTypes;
    var fibonacciSeries = [1, 2, 3, 5, 8, 13];
    this.pList = fibonacciSeries;

    if(typeof args === "undefined"){
        this.id = createId();
        this.type = taskTypes[4];
        this.title = "";
        this.parent = {};
        this.children = [];
        this.associates = [];
        this.points = fibonacciSeries[1];
        this.description = "";
        this.status = statuses[0];
        this.sprints = [];
        this.estimateOfTime = {};
        this.deadline = {};
    } else if (typeof args === "object"){
        var task = new Task();
        Object.keys(args).forEach(function(key){
            task[key] = args[key];
        });
        return task;
    }
}
