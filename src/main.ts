import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './directive/drag';
Vue.config.productionTip = false
// Vue.directive("my-drag", function(el, binding, vnode){
//   el.draggable = true;
//   el.addEventListener("dragstart", function(env: DragEvent){
//       env.dataTransfer?.setData("Text",(env.target as any).id);
//   }) 
// })

// Vue.directive("my-drop", function(el, binding, vnode){
//   el.draggable = true;
//   el.addEventListener("dragover", function(env: DragEvent){
//       env.preventDefault();
//   })
//   el.addEventListener("drop", function(env: DragEvent){
//       const data = env.dataTransfer?.getData("Text");
//       const dragEl: Element = document.querySelector(`#${data}`) as any ;
//       el.appendChild(dragEl);
//   }) 
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
