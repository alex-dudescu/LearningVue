import Vue from 'vue';
import store from 'Store/index'

Vue.directive('drag', {
  inserted: function(el, binding) {

    initDraggable(el, binding.value);
    el.addEventListener('dragstart', onDragStart);
    el.addEventListener('dragend', onDragEnd);
  } 
})

function getElementById(elementsArray, id)
{
  return elementsArray.find(element => element.id.includes(id));
}

async function onDragStart(dragEvent)  {
 
  var el = getElementById(dragEvent.path, 'draggable')

  if(!store.getters['dnd/getGlobalDragState']) {
    el.isDragged = true;
    await store.dispatch('dnd/toggleGlobalDragState');
    dragEvent.dataTransfer.setData("elementId", el.id);
    el.children[0].classList.add('hide-in-drag');
    console.log(dragEvent);
  }
}

async function onDragEnd(dragEvent) {
  
  var el = getElementById(dragEvent.path, 'draggable')
  
  if(store.getters['dnd/getGlobalDragState'])
  {
    el.isDragged = false;
    await store.dispatch('dnd/toggleGlobalDragState');
    el.children[0].classList.remove('hide-in-drag');
  }
}

async function initDraggable(el, categoryName) {
  
  el.isDragged = false;
  el.categoryName = 'default';

  if(el.category !== 'default')
  await store.dispatch('dnd/addCategory', {
    categoryName : el.categoryName
  })

  await store.dispatch('dnd/addDraggable', {
    categoryName: el.categoryName
  }).then(uniqueID => {
    el.id = uniqueID;
    console.log(
      `%cCreated draggable with id ${el.id} in category ${
        el.categoryName
      }`,
      "background-color: #3399ff; color: white; padding-left: 3px; padding-right: 3px;"
    );
  })

  el.setAttribute('draggable', 'true');
}