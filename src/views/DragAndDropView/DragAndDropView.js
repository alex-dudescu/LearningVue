import { KanbanCard, KanbanColumn} from 'Components/kanban/'
import { mapGetters } from 'vuex';

export default {
  name: "DragAndDropView",
  data:  function() {
    return {
      mouseOverBoard: false,
      kanbanColumns: [],
    }
  },
  components: {
      KanbanCard,
      KanbanColumn,
      'kanban-add-button': () => import('Components/kanban/KanbanAddButton.vue')
  },
  computed: {
    ...mapGetters('dragAndDrop', [
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
    },
    addColumn: function(e) {
      this.kanbanColumns.push(e);
    }
  }
};