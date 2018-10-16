<template>
<div>
    <div class="card c-card">
        <div v-if="!details" v-on:click="showDetails()" class="card-body c-card-body" v-bind:class="stCardClasses[task.stList.indexOf(task.status)]">
            <span class="title mb-1">{{title}}</span>
            <div class="badge badge-dark c-badge float-right">{{task.points}}</div>
        </div>
        <div v-if="details && readOnly" v-on:mouseleave="hideDetails()" class="card-body c-card-body" v-bind:class="stCardClasses[task.stList.indexOf(task.status)]">
            <div class="edit mb-2">
                <div v-if="readOnly" class="badge badge-dark c-badge">{{task.points}}</div>
                <EditButton v-on:click.native="edit()">edit</EditButton>
            </div>
            <h4 class="mb-1" v-bind:class="task.status==task.stList[task.stList.length - 1]?'text-decoration: line-through':''">{{title}}</h4>
            <div class="btn-group btn-group-toggle mb-2" data-toggle="buttons">
                <label v-for="(st, i) in task.stList" :key="i" class="btn btn-sm" v-on:click="task.status = st"
                    v-bind:class="task.status==st? stClasses[i]: 'btn-secondary'">
                    <input type="radio" autocomplete="off"> {{st}}
                </label>
            </div>
            <div class="card-text" v-if="readOnly && task.description" v-html="rendered"></div>
        </div>
        <form v-if="details && !readOnly" class='card-body c-card-body bg-light' action="#">
            <CrossButton class="esc mb-3" v-on:click.native="cancel()">esc</CrossButton>
            <TickButton class="okay mb-3" v-on:click.native="save()">save</TickButton>
            <input class="form-control mb-2" v-model="task.title" placeholder="Title">
            <div class="btn-group midBar mb-2">
                <div class="storyPoints">
                    <div v-on:click="decreasePoints()" class="badge badge-dark c-badge-button">-</div>
                    <div class="badge badge-dark c-badge">{{task.points}}</div>
                    <div v-on:click="increasePoints()" class="badge badge-dark c-badge-button">+</div>
                </div>
            </div>
            <div class="btn-group btn-group-toggle mb-2" data-toggle="buttons">
                <label v-for="(st, i) in task.stList" :key="i" class="btn btn-sm" v-on:click="task.status = st"
                    v-bind:class="task.status==st? stClasses[i]: 'btn-secondary'">
                    <input type="radio" autocomplete="off"> {{st}}
                </label>
            </div>
            <markdown-editor v-model="task.description" v-bind:configs="editorConfig"></markdown-editor>       
        </form>
    </div>
</div>
</template>
<script>
import MarkdownEditor from 'vue-simplemde/src/markdown-editor';
import TickButton from './tick-button.vue';
import CrossButton from './cross-button.vue';
import EditButton from './edit-button.vue';
import ArrowButton from './arrow-button.vue';
import marked from 'marked/marked.min.js';

function next(current, list){
    return list[Math.min(list.indexOf(current) + 1, list.length - 1)]
}

function previous(current, list){
    return list[Math.max(list.indexOf(current) - 1, 0)]
}

export default {
    name: 'task-window',
    components:{TickButton, CrossButton, MarkdownEditor, EditButton, ArrowButton},
    props:['initTask'],
    data:function(){
        var task = this.initTask;
        return {
            task: task,
            details: false,
            readOnly: true,
            checkbox: false,
            stClasses: ["btn-light", "btn-primary", "btn-warning", "btn-success"],
            stCardClasses:["card-parked", "card-todo", "card-inprogress", "card-done"],            
            editorConfig: {
                placeholder: "Description"
            }
        };
    },
    computed:{
        title: function(){
            return this.task.title? this.task.title: "task title"
        },
        rendered: function(){
            return marked(this.task.description);
        }
    },
    methods:{
        showDetails: function(){
            this.details = true;
        },
        hideDetails: function(){
            this.details = false;
            this.readOnly = true;
        },
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
        edit: function() {
            this.readOnly = false;
        },
        save: function(){
            // TODO send data
            this.readOnly = true;
            hideDetails();
        },
        cancel: function(){
            this.readOnly = true;
            hideDetails();
        }
    }
}

</script>
<style lang="scss">
$card-width:270px;

.CodeMirror{
  height: 150px;
  min-height:100px;
  overflow-y: scroll;
}
.c-card{
    width: $card-width;
}
</style>

<style lang="scss" scoped>
@import "node_modules/bootstrap/scss/bootstrap";
@import '~simplemde/dist/simplemde.min.css';

.c-card-body{
    padding: 10px;
}
$card-lighten-value:25%;
.card-parked{
    background-color: lighten(theme-color("light"), $card-lighten-value);
}
.card-todo{
    background-color: lighten(theme-color("primary"), $card-lighten-value);    
}
.card-inprogress{
    background-color: lighten(theme-color("warning"), $card-lighten-value);    
}
.card-done{
    background-color: lighten(theme-color("success"), $card-lighten-value);    
}
.midBar{
    font-weight: 500;    
    width:100%;
}
.storyPoints{
    div{
        display:inline-block;
    }        
    .value{
        $side:10px;
        padding-left: $side;
        padding-right: $side;
    }
}
.c-badge{
    font-family: 'Courier New', Courier, monospace;    
}
.c-badge-button{
    @extend .c-badge;
    cursor: pointer;
    &:focus{
        outline: 0;     
    }
    &:active{
        background-color: lighten(theme-color("dark"), 30%);
    }
}
span{
    margin: 0px 10px;
}
.topBtn{
    float: right;
    cursor: pointer;
    display: inline-block;
}
.okay{
    @extend .topBtn;
}
.esc{
    @extend .topBtn;
    float: left;
}
.edit{
    @extend .topBtn;
}
.title{
    font-size: 1em;
}
</style>
