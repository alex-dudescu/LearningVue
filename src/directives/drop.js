import Vue from 'vue';

function onDragStart() 
{
    console.log('I was dragged!');
}

Vue.directive('drop', {
    bind: function(el) {
      el.addEventListener('dragenter', onDragStart);
    } 
  })