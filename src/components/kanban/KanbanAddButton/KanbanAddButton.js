import BFormInput from "~/bootstrap-vue/es/components/form-input/form-input";

export default {
  name: "KanbanAddButton",
  components: {
    BFormInput
  },
  data: function() {
    return {
      showInputField: false,
      text: ""
    };
  },
  methods: {
    onBlur: function() {
      this.showInputField = false;
      this.text = "";
    },
    showInput: function() {
      this.showInputField = true;
      this.$nextTick(() => this.$refs["inputField"].focus());
    },
    valueEntered: function() {
      this.$emit('valueEntered', this.text);
      this.showInputField = false;
      this.text = "";
    }
  }
};
