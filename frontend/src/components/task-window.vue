<template>
<form class='form-horizontal' action="#">
    <div class="form-group" v-on:keyup.esc="cancel()">
        <input class="form-control mb-2" v-model="task.title" placeholder="Title">
        <div class="mb-2 btn-group midBar">
            <button type="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{task.type}}
            </button>
            <div class="dropdown-menu">
                <button class="dropdown-item btn-dark" v-for="t in task.tList" v-bind:key="t" v-on:click="task.type=t">
                    {{t}}
                </button>
            </div>
            <div class="storyPoints">
                <div class="input-group-prepend">
                    <button v-on:click="decreasePoints()" type="button" class="btn btn-dark minus"></button>
                </div>
                <div class="value">{{task.points}}</div>
                <div class="input-group-append">
                    <button v-on:click="increasePoints()" type="button" class="btn btn-dark plus"></button>
                </div>
            </div>
        </div>
        <div class="btn-group btn-group-toggle mb-2" data-toggle="buttons">
            <label v-for="(st, i) in task.stList" :key="i" class="btn btn-sm" v-on:click="task.status = st"
                v-bind:class="task.status==st? task.stClasses[i]: 'btn-secondary'">
                <input type="radio" autocomplete="off"> {{st}}
            </label>
        </div>
        <markdown-editor class="form-control mb-2" v-model="task.description" v-bind:configs="editorConfig"></markdown-editor>
        <button class="btn btn-primary">Save</button>
        <button class="btn btn-danger">Cancel</button>        
    </div>
</form>
</template>
<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor';

function next(current, list){
    return list[Math.min(list.indexOf(current) + 1, list.length - 1)]
}

function previous(current, list){
    return list[Math.max(list.indexOf(current) - 1, 0)]
}

export default {
    props:['initTask'],
    data:function(){
        return {
            task: this.initTask,
            readOnly: true,
            editorConfig: {
                placeholder: "Description",
                hideIcons: true
            }
        };
    },
    methods:{
        increasePoints: function(){
            this.task.points = next(this.task.points, this.task.pList);
        },
        decreasePoints: function(){
            this.task.points = previous(this.task.points, this.task.pList);
        },
        nextStatus: function(){
            this.task.status = next(this.task.status, this.task.stList);
        },
        nextStatus: function(){
            this.task.status = previous(this.task.status, this.task.stList);
        },
        save: function(){
            // TODO send data
            this.readOnly = true;
        },
        edit: function(task) {
            this.readOnly = false;
        },
        cancel: function(){
            this.readOnly = true;
        }
    }
}

</script>
<style lang="scss" scoped>
@import "node_modules/bootstrap/scss/bootstrap";
@import '~simplemde/dist/simplemde.min.css';

.button{
    padding: 0px 10px 5px;
    &:focus{
        outline: 0;     
    }
    &:active{
        background-color: darken(theme-color("primary"), 100%);
    }
}
.midBar{
    font-weight: 500;    
    width:100%;
}
.storyPoints{
    position:absolute;
    right: 0px;    
    div{
        display:inline-block;
    }        
    .value{
        $side:10px;
        padding-left: $side;
        padding-right: $side;
    }
}
.plus{
    @extend .button;
    &:after{
        content:'\002B';
    }
}
.minus{
    @extend .button;
    &:after{
        content:'\2212';
    }
}
span{
    margin: 0px 10px;
}
</style>
