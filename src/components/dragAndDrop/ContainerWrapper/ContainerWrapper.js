import "core-js/shim";
import "regenerator-runtime/runtime";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ConatinerWrapper",
  props: {
    category: {
      type: String,
      default: "default"
    }
  },
  data: function() {
    return {
      itemID: undefined
    };
  },
  computed: {
    ...mapGetters("dragAndDrop", ["getContainersDraggableList"])
  },
  methods: {
    ...mapActions("dragAndDrop", ["addContainer", "moveDraggable"]),

    initContainer: function() {
      this.addContainer({
        categoryName: this.category
      }).then(uniqueID => {
        this.itemID = uniqueID;
        this.$emit("update:assignedID", this.itemID);

        console.log(
          `%cCreated container with id ${this.itemID} in category ${
            this.category
          }`,
          "background-color: #3399ff; color: white; padding-left: 3px; padding-right: 3px;"
        );
      });
    },

    onDrop: async function(dropEvent) {
      var draggableID = dropEvent.dataTransfer.getData("elementId");

      this.moveDraggable({
        draggableID: draggableID,
        containerID: this.itemID
      });

      document
        .getElementById(this.itemID)
        .appendChild(document.getElementById(draggableID));
    },

    allowDrop: async function(dropEvent) {
      dropEvent.preventDefault();
    }
  },
  created: async function() {
    await this.initContainer();
  },
  mounted: function() {
  },
  beforeUpdate: function() {
    this.$emit("update:assignedID", this.itemID);
  }
};
