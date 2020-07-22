<template>
  <div  @dragover = "dragover"  @drop = "drop">
    <dragbale
      v-for="(item) in dragList"
      :key="item.id"
      :data="item"
      ref="dragItem"
      @dragMove="dragMove"
      @dragStart="daragStart"
    >
      <div class="center" :class="[item.class]">
        {{ item.text }}
      </div>
    </dragbale>

      
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch} from "vue-property-decorator";
import dragbale from "./dragbale.vue";
import { Observable, Subject } from "rxjs";
import { debounceTime, throttleTime } from "rxjs/operators";
@Component({
  name: "DropContainer",
  components: {
    dragbale,
    
  },
})
export default class App extends Vue {
  dragList: Array<DragItem> = [];
  dragSubject!: Subject<DragEvent>;
  dragEl!: DragItem;
  list: any = [];
  dotttedIndex = -1;
  dottedDragEl: DragItem = {
      class: "dotted",
      text: "1",
      id:-1,
  }
  created() {
    this.dragSubject = new Subject().pipe(throttleTime(200));
    this.dragSubject && this.dragSubject.subscribe(this.patchToOtherEl);
    this.list =  [1,2,3];
    this.dragList = [
      {
        class: "entity",
        text: "1",
        id:1,
      },
      {
        class: "entity",
        text: "2",
        id:2
      },
      {
        class: "entity",
        text: "3",
        id:3
      },
      {
        class: "entity",
        text: "4",
        id:4
      },
      {
        class: "entity",
        text: "5",
        id:5
      },
      {
        class: "entity",
        text: "6",
        id:6
      },
      {
        class: "entity",
        text: "7",
        id:7
      },
      {
        class: "entity",
        text: "8",
        id:8
      },
      {
        class: "entity",
        text: "9",
        id:9
      },
      {
        class: "entity",
        text: "10",
        id:10
      },
    ];

  }

  daragStart(data: DragEvent, dragEl: DragItem) {
      this.dragEl = dragEl;
  }
  dragover(env: DragEvent) {
      env.preventDefault();
  }
  dragMove(data: DragEvent, dragEl: DragItem) {

    
    this.dragSubject && this.dragSubject.next(data);
  }

  drop(env: DragEvent) {
      console.log(this.dragList, "drop  removeDoot 前")
      this.removeDott();
      const moveIndex = this.getMoveIndex(env);

      const currentEl: any = this.dragList[moveIndex];
      if(moveIndex == -1)
      {
          return;
      }
       console.log(this.dragList, "drop  removeDoot 后")
     // this.dragList.splice(moveIndex, 1, this.dragEl, currentEl);
       console.log(this.dragList, " drop dragList")
      const dragIndex = this.getDragIndex(this.dragEl);
     // this.dragList.splice(dragIndex,1);

      this.dotttedIndex = -1;
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
    (this.$refs.dragItem as Array<any>).find((v: any, index: number) => {
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
    console.log(moveIndex," moveIndex")
    return moveIndex;
  }

  //比较拖动元素和当前容器内的元素
  patchToOtherEl(data: DragEvent) {
    (this.$refs.dragItem as Array<any>).find((v, index) => {
      if(this.getDragIndex(this.dragEl) != index){
        const isIn = this.isMoveOnElement({
          x: data.clientX,
          y: data.clientY,
          el: v.$el,
        });
        if(isIn){
            console.log(this.dragList," removeDoot 前")
           
            console.log(this.dragList, " removeDoot 后");
            let moveINdex = this.getElIndexById((v.$el as HTMLElement).getAttribute("data-id"));
            let currentEl: any = this.dragList[moveINdex];
            if(!currentEl|| (v.$el as HTMLElement).getAttribute("data-id") == "-1")
            {
              return v;
            }
             this.removeDott();              
            if(moveINdex>this.dotttedIndex){
              moveINdex--;
              currentEl = this.dragList[moveINdex]
            }
            this.dottedDragEl.text = this.dragEl.text;
            console.log(this.dottedDragEl, currentEl,moveINdex,"这是e",(v.$el as HTMLElement).getAttribute("data-id"))
            this.dragList.splice(moveINdex, 1, this.dottedDragEl, currentEl);
            this.dotttedIndex = moveINdex;
            console.log(this.dragList)
            return v;
        }
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

  getElIndexById(id: string|null){
      let index = -1;
      this.dragList.find((v: DragItem, i: number) => {
          if(v.id+"" == id)
          {
              index = i;
              return v;
          }
      })
      console.log(index," getINdex")
      return index;
  }
  getDragIndex(dragEl: DragItem){
      let index = -1;
      this.dragList.find((v: DragItem, i: number) => {
          if(v.id == dragEl.id)
          {
              index = i;
              return v;
          }
      })
      console.log(index," getDragIndex")
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
