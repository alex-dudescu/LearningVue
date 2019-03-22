import { mapGetters } from "vuex";

export default {
  name: "KanbanColumn",
  components: {
    'kanban-add-button': () => import('Components/kanban/KanbanAddButton.vue'),
    'kanban-card': () => import('Components/kanban/KanbanCard.vue')
  },
  props: {
    pannelName: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      itemID: '',
      kanbanCards: [],
    }
  },
  computed: {
    ...mapGetters("dragAndDrop", [
      "getContainersDraggableList",
      "getContainerAvailabilty"
    ]),
    ...mapGetters("kanban", [
      "getCards"
    ])
  },
  methods: {
    onIDAssigned: function(e) {
      this.itemID = e.uniqueID;
    },
    addCard: function(e) {
      this.kanbanCards.push(e);
    }
  }
};
