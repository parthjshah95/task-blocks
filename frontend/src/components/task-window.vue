<template>
<div>
    <EditButton class="edit mb-3" v-if="readOnly" v-on:click.native="edit()">edit</EditButton>
    <CrossButton class="esc mb-3" v-if="!readOnly" v-on:click.native="cancel()">esc</CrossButton>
    <TickButton class="okay mb-3" v-if="!readOnly" v-on:click.native="save()">save</TickButton>
    <form class='form-horizontal' action="#">
        <input class="form-control mb-2" v-if="!readOnly" v-model="task.title" placeholder="Title">
        <h4 class="mb-2 card-title" v-if="readOnly">{{this.task.title? this.task.title: "task title"}}</h4>
        <div class="btn-group midBar" v-bind:class="readOnly? '': ' mb-2'">
            <div v-if="!readOnly">
                <button type="button" class="btn btn-sm btn-outline-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{task.type}}
                </button>
                <div class="dropdown-menu">
                    <button class="dropdown-item btn-sm btn-dark" v-for="t in task.tList" v-bind:key="t" v-on:click="task.type=t">
                        {{t}}
                    </button>
                </div>
            </div>
            <div class="storyPoints">
                <div v-if="!readOnly" v-on:click="decreasePoints()" class="badge badge-dark c-badge-button">-</div>
                <div class="badge badge-dark c-badge">{{task.points}}</div>
                <div v-if="!readOnly" v-on:click="increasePoints()" class="badge badge-dark c-badge-button">+</div>
            </div>
            <div>
                <div v-if="readOnly" class="btn btn-sm btn-outline-dark">{{task.type}}</div>
                <div v-if="readOnly" class="btn btn-sm" v-bind:class="task.stClasses[task.stList.indexOf(task.status)]">
                    {{task.status}}
                </div>
            </div>
        </div>
        <div v-if="!readOnly" class="btn-group btn-group-toggle mb-2" data-toggle="buttons">
            <label v-for="(st, i) in task.stList" :key="i" class="btn btn-sm" v-on:click="task.status = st"
                v-bind:class="task.status==st? task.stClasses[i]: 'btn-secondary'">
                <input type="radio" autocomplete="off"> {{st}}
            </label>
        </div>
        <div v-if="readOnly && task.description" class="form-control mb-2" v-html="rendered"></div>
        <markdown-editor v-if="!readOnly" class="form-control mb-2" v-model="task.description" v-bind:configs="editorConfig"></markdown-editor>       
    </form>
</div>
</template>
<script>
import MarkdownEditor from 'vue-simplemde/src/markdown-editor';
import TickButton from './tick-button.vue';
import CrossButton from './cross-button.vue';
import EditButton from './edit-button.vue';
import marked from 'marked/marked.min.js';

function next(current, list){
    return list[Math.min(list.indexOf(current) + 1, list.length - 1)]
}

function previous(current, list){
    return list[Math.max(list.indexOf(current) - 1, 0)]
}

export default {
    name: 'task-window',
    components:{TickButton, CrossButton, MarkdownEditor, EditButton},
    props:['initTask'],
    data:function(){
        var task = this.initTask;
        return {
            task: task,
            readOnly: false,
            editorConfig: {
                placeholder: "Description"
            }
        };
    },
    computed:{
        rendered: function(){
            return marked(this.task.description);
        }
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
        edit: function() {
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

.midBar{
    font-weight: 500;    
    width:100%;
}
.storyPoints{
    position:absolute;
    height: 40px;
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
</style>
