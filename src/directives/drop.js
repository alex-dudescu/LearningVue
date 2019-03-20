import Vue from "vue";
import store from "Store/index";

Vue.directive("drop", {
  bind: function(el, binding) {
    el.categoryName = "default";

    initContainer(el, binding.value);

    el.addEventListener("drop", onDrop);
    el.addEventListener("dragover", allowDrop);
  }
});

function getElementById(elementsArray, id)
{
  return elementsArray.find(element => element.id.includes(id));
}

async function initContainer(el, categoryName ) {
  await store
    .dispatch("dnd/addContainer", {
      categoryName: el.categoryName
    })
    .then(uniqueID => {
      el.id = uniqueID;

      var assignedIDEvent = new Event("assignedID");
      assignedIDEvent.uniqueID = el.id;
      el.dispatchEvent(assignedIDEvent);

      console.log(
        `%cCreated container with id ${el.id} in category ${
          el.categoryName
        }`,
        "background-color: #3399ff; color: white; padding-left: 3px; padding-right: 3px;"
      );
    });
}

function allowDrop(dropEvent) {
  dropEvent.preventDefault();
}


function onDrop(dropEvent) {
  var draggableID = dropEvent.dataTransfer.getData("elementId");
  var conatinerID = getElementById(dropEvent.path, 'container').id;

  store.dispatch('dnd/moveDraggable', {
    draggableID: draggableID,
    containerID: conatinerID
  })

  document.getElementById(conatinerID).appendChild(document.getElementById(draggableID));
}
