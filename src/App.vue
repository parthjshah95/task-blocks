<template>
  <div id="app">
    <Header></Header>
    <CategoriesNav></CategoriesNav>
    <div class='container'>
      <div class="row">
        <Container class="">
          <Draggable>
            <TaskWindow v-if="showTaskInfo" id="task-window" v-bind:initTask="initTask"></TaskWindow>
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
      showTaskInfo: true,
      initTask: (new Task())
    };
  }
};
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';

html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
#app {
  padding: 0px;
}
</style>
