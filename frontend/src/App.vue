<template>
  <b-container fluid id="app">
    <Header></Header>
    <Container>
      <Draggable>foo</Draggable>
    </Container>
  </b-container>
  
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import Header from "./components/header.vue";

export default {
  name: 'app',
  components: { Container, Draggable, Header},
  methods: {
    onDrop: function(dropResult) {
      this.items = applyDrag(this.items, dropResult);
    }
  },
  data: function() {
    return {
      msg: 'Dhwan is dhabbooram'
    }
  }
}
</script>

<style lang="scss">
body{
  margin: 0;
}
#app{
  padding:0px;
}
</style>
