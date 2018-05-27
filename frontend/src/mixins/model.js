export default {
    methods:{
        Task(args){
            function createId(){
                dateStr = new Date().toString();
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

            const stList = ["Parked","To Do","In Progress","Done"];//list of possible statuses
            const taskTypes = ["Objective","Epic","Story","Sub-task","Float","Sub-float"];
            const fibonacciSeries = [1,2,3,5,8,13];

            if(typeof args === "undefined"){
                this.id = createId();
                this.type = taskTypes[4];
                this.title = "name me";
                this.parent = {};
                this.children = [];
                this.associates = [];
                this.points = fibonacciSeries[1];
                this.description = "describe me";
                this.status = stList[1];
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
    }
}