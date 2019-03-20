import BButton          from '~/bootstrap-vue/es/components/button/button'
import BPopover         from '~/bootstrap-vue/es/components/popover/popover'
import BFormInput       from '~/bootstrap-vue/es/components/form-input/form-input'
import KanbanCardModal  from '../KanbanCardModal'
import BtColorPicker    from 'UI/BtColorPicker'

export default {
  name: "KanbanCard",
  data: function() {
    return {
      isInEdit: false,
      isMouseOver: false,
      text: "Kanban card",
      editedText: "",
      id: null,
      colorClass: ''
    };
  },
  components:{
    KanbanCardModal,
    BFormInput,
    BPopover,
    BButton,
    BtColorPicker,
  },
  methods: {
    onFocused() {
      this.startEditing();
      this.isInEdit = true;
      this.$nextTick(() => this.$refs['cardInput'].focus())
      this.$root.$emit('bv::show::popover', this.id)
    },
    onBlured() {
      this.isInEdit = false;
      this.$root.$emit('bv::hide::popover',  this.id)
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
    },
    startEditing() {
      this.editedText = this.text;
    },
    applyColor(e) {
      this.colorClass = e; 
    }
  },
  created: function() {
    this.id = this._uid;
  }
};
