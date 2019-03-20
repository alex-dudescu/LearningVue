import { mapGetters } from "vuex";
import { ContainerWrapper } from "Components/dragAndDrop/";

export default {
  name: "KanbanColumn",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      itemID: ''
    }
  },
  components: {
    ContainerWrapper
  },
  computed: {
    ...mapGetters("dnd", [
      "getContainersDraggableList",
      "getContainerAvailabilty"
    ])
  },
  methods: {
    onIDAssigned: function(e) {
      this.itemID = e.uniqueID;
    }
  }
};
