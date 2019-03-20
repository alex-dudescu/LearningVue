import { DraggableCard, DragWrapper, ContainerWrapper } from 'Components/dragAndDrop/'
import { KanbanCard, KanbanCardModal, KanbanColumn }    from 'Components/kanban/'
import BFormInput     from '~/bootstrap-vue/es/components/form-input/form-input'
import { mapGetters } from 'vuex';

export default {
  name: "DragAndDropView",
  data:  function() {
    return {
      mouseOverBoard: false,
      showInputField: false,
      kanbanColumns: [],
      columnText: ''
    }
  },
  components: {
      DraggableCard,
      DragWrapper,
      ContainerWrapper,
      KanbanCard,
      KanbanCardModal,
      KanbanColumn,
      BFormInput
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
    },
    onBlur: function() {
      this.showInputField = false;
      this.columnText = '';
    },
    showColumnInput: function() {
      this.showInputField = true;
      this.$nextTick(() => this.$refs['columnInputField'].focus())
    },
    addColumn: function() {
      this.kanbanColumns.push(this.columnText);
      this.showInputField = false;
      this.columnText = '';
    }
  }
};