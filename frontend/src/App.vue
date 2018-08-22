<template>
  <div id="app">
    <Header></Header>
    <TaskWindow v-if="showTaskInfo" id="task-window" v-bind:initTask="initTask"></TaskWindow>
    <Container>
      <Draggable>foo</Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import Header from "./components/header.vue";
import TaskWindow from "./components/task-window.vue";
import Task from './model/Task.js';

export default {
  name: "app",
  components: {Container, Draggable, Header, TaskWindow},
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

.CodeMirror{
  height: 100px;
  min-height:100px;
  overflow-y: scroll;
}
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
#task-window {
  background: lightgray;
  position:absolute;
  right: 0px;
  width: 300px;
  padding:10px;
}
</style>
