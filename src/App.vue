<template>
  <div id="app">
    <dragbale>哈哈哈</dragbale>
    <dragbale>呀呀呀</dragbale>
    <dropContainer class="container"></dropContainer>
    <div v-for="(item, index) in list" :key="index">{{ item }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import dragbale from "./components/dragbale.vue";
import dropContainer from "./components/dropContainer.vue";

@Component({
  components: {
    HelloWorld,
    dragbale,
    dropContainer,
  },
})
export default class App extends Vue {
  list!: Array<any>;
  created() {
    this.list = [1, 2, 3, 4];
    setTimeout(() => {
      this.list.splice(1, 1);
    }, 1000);
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  height: 600px;
  width: 1000px;
  border: 1px solid #ccc;
  flex-wrap: wrap;
  align-items: flex-start;
  display: flex;
}
</style>
