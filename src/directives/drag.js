import Vue from "vue";
import store from "Store/index";

Vue.directive("drag", {
  inserted: function(el, binding, vnode) {
    initDraggable(el, binding, vnode);
    el.addEventListener("dragstart", onDragStart);
    el.addEventListener("dragend", onDragEnd);
  }
});

function getElementById(elementsArray, id) {
  return elementsArray.find(element => element.id.includes(id));
}

var emit = (vnode, name, data) => {
  var handlers =
    (vnode.data && vnode.data.on) ||
    (vnode.componentOptions && vnode.componentOptions.listeners);

  if (handlers && handlers[name]) {
    handlers[name].fns(data);
  }
};

async function onDragStart(dragEvent) {
  var el = getElementById(dragEvent.path, "draggable");

  if (!store.getters["dragAndDrop/getGlobalDragState"]) {
    el.isDragged = true;
    await store.dispatch("dragAndDrop/toggleGlobalDragState");
    dragEvent.dataTransfer.setData("elementId", el.id);
    el.children[0].classList.add("hide-in-drag");
    console.log(dragEvent);
  }
}

async function onDragEnd(dragEvent) {
  var el = getElementById(dragEvent.path, "draggable");

  if (store.getters["dragAndDrop/getGlobalDragState"]) {
    el.isDragged = false;
    await store.dispatch("dragAndDrop/toggleGlobalDragState");
    el.children[0].classList.remove("hide-in-drag");
  }
}

async function initDraggable(el, binding, vnode) {

  if (el.id === "") {
    var categoryName = binding.value.categoryName.toString();
    var containerID = binding.value.containerID.toString();

    el.isDragged = false;
    el.categoryName = categoryName !== "" && categoryName !== undefined ? categoryName : "default";

    if (el.categoryName !== "default")
      await store.dispatch("dragAndDrop/addCategory", {
        categoryName: el.categoryName
      });

    await store
      .dispatch("dragAndDrop/addDraggable", {
        categoryName: el.categoryName,
        containerID: containerID
      })
      .then(uniqueID => {
        el.id = uniqueID;

        emit(vnode, "assignedID", { uniqueID: el.id });

        console.log(
          `%cCreated draggable with id ${el.id} in category ${el.categoryName}`,
          "background-color: #3399ff; color: white; padding-left: 3px; padding-right: 3px;"
        );
      });
  }

  el.setAttribute("draggable", "true");
}
