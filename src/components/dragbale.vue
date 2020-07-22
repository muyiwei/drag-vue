<template>
    <div draggable = "true" @dragstart = "dragstart" @drag = "drag" class="dragable" :data-id="data.id">
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
    this.$emit("dragStart",
      e,
      this.data
    );
  }

  drag(e: any) {
    this.$emit("dragMove",
      e,
      this.data
    );
  }
}
</script>
<style lang="less">
.dragable{
  cursor: move;
}
</style>