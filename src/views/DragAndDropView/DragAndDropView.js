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