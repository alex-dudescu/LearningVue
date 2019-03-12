import Vue from 'vue';
import { mapActions, Store } from 'vuex';
import store from 'Store/index'

// var context = document.getElementById('app').getContext("2d")

function draw() {
}

function getElementById(elementsArray, id)
{
  return elementsArray.find(element => element.id.includes(id));
}

async function onDragStart(dragEvent)  {
  if(!( await store.state.isElementInDrag)) {
    store.dispatch('dragAndDrop/toggleDrag')

    var el = getElementById(dragEvent.path, 'draggable')
    
    console.log(`${JSON.stringify(el.id)} was dragged!`);

    el.classList.add('hide-in-drag');
  }
}

async function onDragEnd(dragEvent) {
  if(await store.state.isElementInDrag)
  {
    store.dispatch('dragAndDrop/toggleDrag')
    var el = getElementById(dragEvent.path,'draggable')
    console.log(`${JSON.stringify(el.id)} stopped dragging!`);
    
    el.classList.remove('hide-in-drag');
  }
}

function initDraggable(el, categoryName) {
  
  store.dispatch('dragAndDrop/addToCategory', { 
    categoryName: categoryName, 
    itemType: 'draggable'
  }).then((res) => el.id = res)

  el.setAttribute('draggable', 'true');
}

Vue.directive('drag', {
    inserted: function(el, binding) {

      initDraggable(el, binding.value);
      el.addEventListener('dragenter', onDragStart);
      el.addEventListener('dragend', onDragEnd);
    } 
})