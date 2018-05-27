<template>
  <div id="app">
    <Header></Header>
    <TaskWindow v-if="showTaskInfo" id="task-window"></TaskWindow>
    <Container>
      <Draggable>foo</Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import Header from "./components/header.vue";
import TaskWindow from "./components/task-window.vue";
import Model from "./mixins/model.js";

export default {
  name: "app",
  components: { Container, Draggable, Header, TaskWindow },
  mixins:[Model],
  methods: {
    onDrop: function(dropResult) {
      this.items = applyDrag(this.items, dropResult);
    }
  },
  data: function() {
    return {
      showTaskInfo: true,
      msg: "Dhwan is dhabbooram"
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
#task-window {
  background: lightgray;
  position:absolute;
  right: 0px;
  width: 300px;
  padding:10px;
}
</style>
