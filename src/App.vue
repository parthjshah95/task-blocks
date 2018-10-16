<template>
  <div id="app" class="h-100 d-flex flex-column">
    <Header></Header>
    <div class="container-fluid d-flex h-100">
      <div class="row flex-fill">
        <CategoriesNav></CategoriesNav>
        <Container class="task-container">
          <Draggable v-for="(task, index) of tasks" v-bind:key="index" class='mb-2'>
            <TaskWindow v-bind:initTask="task"></TaskWindow>
          </Draggable>
        </Container>
      </div>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import Header from "./components/header.vue";
import TaskWindow from "./components/task-window.vue";
import Task from './model/Task.js';
import CategoriesNav from './components/categories-nav.vue';

export default {
  name: "app",
  components: {Container, Draggable, Header, TaskWindow, CategoriesNav},
  methods: {
    onDrop: function(dropResult) {
      this.items = applyDrag(this.items, dropResult);
    }
  },
  data: function() {
    return {
      tasks:[
        new Task({'title': 1}),
        new Task({'title': 2}),
        new Task({'title': 3}),
        new Task({'title': 4}),
        new Task({'title': 5}),
        new Task({'title': 6}),
        new Task({'title': 7}),
        new Task({'title': 8}),
        new Task({'title': 9}),
        new Task({'title': 10}),
        new Task({'title': 11}),
        new Task({'title': 12}),
        new Task({'title': 13}),
        new Task({'title': 14})
      ]
    };
  }
};
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';

html {
  height: 100%;
  overflow: hidden;
}
body {
  margin: 0;
  height: 100%;
  overflow: hidden;
}
.task-container{
  width: 320px;
  display: inline-block;
  padding: 10px;
  overflow-y: scroll;
}
</style>
