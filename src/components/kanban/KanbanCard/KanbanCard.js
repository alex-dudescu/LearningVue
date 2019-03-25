import BButton from "~/bootstrap-vue/es/components/button/button";
import BFormInput from "~/bootstrap-vue/es/components/form-input/form-input";
import { mapActions } from "vuex";

export default {
  name: "KanbanCard",
  props: {
    draggableID: {
      type: String,
      default: ""
    },
    containerID: {
      type: String,
      default: undefined,
    }
  },
  data: function() {
    return {
      isInEdit: false,
      isMouseOver: false,
      text: "Kanban card",
      editedText: "",
      id: "",
      colorClass: "color-turquoise"
    };
  },
  components: {
    "kanban-card-modal": () => import("../KanbanCardModal"),
    BFormInput,
    BButton
  },
  methods: {
    ...mapActions("kanban", ["addCard", "updateCard"]),

    onFocused() {
      this.startEditing();
      this.isInEdit = true;
      this.$nextTick(() => this.$refs["cardInput"].focus());
      this.$root.$emit("bv::show::popover", this.id);
    },
    onBlured() {
      this.isInEdit = false;
      this.$root.$emit("bv::hide::popover", this.id);
    },
    onMouseEnter() {
      this.isMouseOver = true;
    },
    onMouseLeave() {
      this.isMouseOver = false;
    },
    saveModifications() {
      this.text = this.editedText;
      this.onBlured();

      this.updateCard({
        itemID: this.id,
        properties: {
          pannelID: "adfadf",
          cardName: this.text,
          cardColor: this.colorClass
        }
      });
    },
    startEditing() {
      this.editedText = this.text;
    },
    applyColor(e) {
      this.colorClass = e;
    },
    onIDAssigned(e) {
      this.id = e.uniqueID;

      this.addCard({
        itemID: this.id,
        properties: {
          pannelID: "adfadf",
          cardName: this.text,
          cardColor: this.colorClass
        }
      });
    }
  },
  computed: {
    cardModel: function() {
      return {
        categoryName: 'kanban',
        containerID: this.containerID
      }
    }
  },
  created: function() {
    this.id = this.draggableID;
  },
  mounted: function() {}
};
