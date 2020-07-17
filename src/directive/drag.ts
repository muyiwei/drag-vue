// import { Vue } from "vue-property-decorator";
// import { VNode } from 'vue/types/umd';

// Vue.directive("my-drag", {
//   bind: function(el, binding, vnode) {
      
//     el.draggable = true;
//     el.style.cursor = "move";
//     el.addEventListener("dragstart", function(env: DragEvent) {
//       env.dataTransfer?.setData("Text", (env.target as any).id);
//     });
//     document.addEventListener("drag", function(env: DragEvent) {
//         console.log(env.clientX, env.clientY);
//       });
//   },
// });

// Vue.directive("my-drop", {
//   bind: function(el: any, binding: any){
//     el.draggable = true;
//     el.style.display = "flex";
//     el.addEventListener("dragover", function(env: DragEvent) {
//       env.preventDefault();
//     });
//     el.addEventListener("drop", function(env: DragEvent) {
//       console.log(binding);
    
//       binding.value.push(1)
//     });
//   }
// });
