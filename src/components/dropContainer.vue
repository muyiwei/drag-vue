<template>
  <div  @dragover = "dragover" @drop = "drop">
    <dragbale
      v-for="(item) in dragList"
      :key="item.text"
      :data="item"
      ref="dragItem"
      @dragMove="dragMove"
    >
      <div class="center" :class="[item.class]">
        {{ item.text }}
      </div>
    </dragbale>

      
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import dragbale from "./dragbale.vue";
import { Observable, Subject } from "rxjs";
import { debounceTime, throttleTime } from "rxjs/operators";
@Component({
  components: {
    dragbale,
  },
})
export default class App extends Vue {
  dragList: Array<DragItem> = [];
  dragSubject!: Subject<DragEvent>;
  dragEl!: DragItem;
  list: any = [];
  dotttedIndex!: number;
  dottedDragEl: DragItem = {
      class: "dotted",
      text: "1"
  }
  created() {
    this.dragSubject = new Subject().pipe(throttleTime(200));
    this.dragSubject && this.dragSubject.subscribe(this.patchToOtherEl);
    this.list =  [1,2,3];
    this.dragList = [
      {
        class: "entity",
        text: "1",
      },
      {
        class: "entity",
        text: "2",
      },
      {
        class: "entity",
        text: "3",
      },
      {
        class: "entity",
        text: "4",
      },
      {
        class: "entity",
        text: "5",
      },
      {
        class: "entity",
        text: "6",
      },
      {
        class: "entity",
        text: "7",
      },
      {
        class: "entity",
        text: "8",
      },
      {
        class: "entity",
        text: "9",
      },
      {
        class: "entity",
        text: "10",
      },
    ];

  }


  dragover(env: DragEvent) {
      env.preventDefault();
  }
  dragMove(data: DragEvent, dragEl: DragItem) {

    this.dragEl = dragEl;
    this.dragSubject && this.dragSubject.next(data);
  }

  drop(env: DragEvent) {
      debugger;
      this.removeDott();
      const moveIndex = this.getMoveIndex(env);
      const dragIndex = this.getDragIndex(this.dragEl);
      const currentEl: any = this.dragList[moveIndex];
      if(moveIndex == -1)
      {
          return;
      }
      this.dragList.splice(dragIndex,1);
      this.dragList.splice(moveIndex, 1, this.dottedDragEl, currentEl);
      debugger;
  }

  
  //移除虚影
  removeDott() {
    if(this.dotttedIndex != -1)
    {
        this.dragList.splice(this.dotttedIndex, 1);
    }
  }

  getMoveIndex(data: DragEvent) {
    let moveIndex = -1;
    (this.$refs.dragItem as Array<HTMLElement>).forEach((v: any, index: number) => {
      const isIn = this.isMoveOnElement({
        x: data.clientX,
        y: data.clientY,
        el: v.$el,
      });
      if(isIn){
          moveIndex = index;
          return true;
      }
    });
    return moveIndex;
  }

  //比较拖动元素和当前容器内的元素
  patchToOtherEl(data: DragEvent) {
    (this.$refs.dragItem as Array<HTMLElement>).forEach((v, index) => {
      const isIn = this.isMoveOnElement({
        x: data.clientX,
        y: data.clientY,
        el: v,
      });
      if(isIn){
          this.removeDott();
          const currentEl: any = this.dragList[index];
          this.dottedDragEl.text = this.dragEl.text;
          this.dragList.splice(index, 1, this.dottedDragEl, currentEl);
          this.dotttedIndex = index;
      }
    });
  }

  // 判断是否移动到了元素上
  isMoveOnElement(data: DragingData) {
    const { el, x, y } = data;
    const x1 = el.offsetLeft;
    const y1 = el.offsetTop;
    const x2 = x1 + el.offsetWidth;
    const y2 = y1 + el.offsetHeight;
    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
      return true;
    }
    return false;
  }

  getDragIndex(dragEl: DragItem){
      let index = -1;
      this.dragList.forEach((v: DragItem, i: number) => {
          if(v.text == dragEl.text)
          {
              index = i;
              return true;
          }
      })
      return index;
  }
}
</script>
<style lang="less">
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 200px;
  background:#ccc;
  margin:12px;
}
.dotted{
    opacity: 0.3;
}
</style>
