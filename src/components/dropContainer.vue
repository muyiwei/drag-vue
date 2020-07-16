<template>
    <div v-my-drop = "dragList">
        <dragbale v-for="(item, index) in dragList" :key="index">
            {{item}}
        </dragbale>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'; 
import dragbale from "./dragbale.vue";
@Component({
  components: {
      dragbale
  },
})
export default class App extends Vue {
    dragList: Array<DragItem> = [];

}
</script>
<style lang="less">

</style>