import Vue from "vue";
import store from "Store/index";

Vue.directive("drop", {
  bind: function(el, binding, vnode) {
    initContainer(el, binding, vnode);

    el.addEventListener("drop", onDrop);
    el.addEventListener("dragover", allowDrop);
  }
});

function getElementById(elementsArray, id) {
  return elementsArray.find(element => element.id.includes(id));
}

async function initContainer(el, binding, vnode) {
  if (el.id === "") {
    console.log(binding.value);
    var categoryName = binding.value.categoryName.toString();

    // check if category exists and create it 
    if (categoryName !== "default")
      await store.dispatch("dragAndDrop/addCategory", {
        categoryName: categoryName
      });

    await store
      .dispatch("dragAndDrop/addContainer", {
        categoryName: categoryName !== "" && categoryName !== undefined ? categoryName : "default"
      })
      .then(uniqueID => {
        el.id = uniqueID;

        var assignedIDEvent = new Event("assignedID");
        assignedIDEvent.uniqueID = el.id;
        el.dispatchEvent(assignedIDEvent);

        console.log(
          `%cCreated container with id ${el.id} in category ${categoryName}`,
          "background-color: #3399ff; color: white; padding-left: 3px; padding-right: 3px;"
        );
      });
  }
}

function allowDrop(dropEvent) {
  dropEvent.preventDefault();
}

function onDrop(dropEvent) {
  var draggableID = dropEvent.dataTransfer.getData("elementId");
  var conatinerID = getElementById(dropEvent.path, "container").id;

  store.dispatch("dragAndDrop/moveDraggable", {
    draggableID: draggableID,
    containerID: conatinerID
  });

  document
    .getElementById(conatinerID)
    .prepend(document.getElementById(draggableID));
}
