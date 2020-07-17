<template>
    <div draggable = "true" @dragstart = "dragstart" @drag = "drag" class="dragable">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Dragbale extends Vue {
  @Prop({}) data: any;
  @Prop({}) allDrag: any;
  dragstart(e: any) {
    console.log(this.allDrag);
  }

  drag(e: any) {
    this.$emit("dragMove",
      e,
      this.data
    );
  }
  mounted() {
    console.log(this.data, this.allDrag);
  }
}
</script>
<style lang="less">
.dragable{
  cursor: move;
}
</style>