<template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <div class="card mb-2" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" :class="{'border-primary': mouseOverBoard}">
          <div class="card-header">Default containter</div>
          <div class="card-body">
            <drag-wrapper>
              <kanban-card></kanban-card>
            </drag-wrapper>
            <drag-wrapper>
             <kanban-card></kanban-card>
            </drag-wrapper>
            <drag-wrapper>
              <kanban-card></kanban-card>
            </drag-wrapper>
            <drag-wrapper>
              <kanban-card></kanban-card>
            </drag-wrapper>
          </div>
        </div>
        <div class="card border-primary">
          <div class="card-header">Default Container List</div>
          <div class="card-body">
            <div v-if="getContainerAvailabilty('default')">
              {{ getContainersDraggableList('default')}}
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-primary mb-2">
          <div class="card-header">Second Container</div>
            <div class="card-body">
            <container-wrapper>
              <div class="phantom-spacer">
                a
              </div>
            </container-wrapper>
            </div>
        </div>
        <div class="card border-primary">
          <div class="card-header">Second container List</div>
          <div class="card-body">
            <div v-if="getContainerAvailabilty('container-1-2')">
              {{ getContainersDraggableList('container-1-2')}}
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-primary mb-2">
          <div class="card-header">Third container List</div>
          <div class="card-body">
            <container-wrapper>
            </container-wrapper>
          </div>
        </div>
        <div class="card border-primary">
          <div class="card-header">Third container List</div>
          <div class="card-body">
            <div v-if="getContainerAvailabilty('container-1-3')">
              {{ getContainersDraggableList('container-1-3')}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <kanban-card-modal></kanban-card-modal>
  </div>
</template>

<script>
import DraggableCard from 'Components/dragAndDrop/DraggableCard'
import DragWrapper from 'Components/dragAndDrop/DragWrapper'
import ContainerWrapper from 'Components/dragAndDrop/ContainerWrapper'
import KanbanCard from 'Components/kanban/KanbanCard'
import KanbanCardModal from 'Components/kanban/KanbanCardModal'
import { mapGetters } from 'vuex';

export default {
  name: "DragAndDropView",
  data:  function() {
    return {
      mouseOverBoard: false
    }
  }
  ,
  components: {
      DraggableCard,
      DragWrapper,
      ContainerWrapper,
      KanbanCard,
      KanbanCardModal

  },
  computed: {
    ...mapGetters('dnd', [
      'getContainersDraggableList',
      'getContainerAvailabilty'
    ]),
  },
  methods: {
    onMouseEnter: function() {
      this.mouseOverBoard = true;
    },
    onMouseLeave: function() {
      this.mouseOverBoard = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.card-body {
  padding: 0.5em;
}
.phantom-spacer {
  min-height: 1em;
  background-color: #aaaaaa;
}
</style>

