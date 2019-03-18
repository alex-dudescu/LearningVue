export default {
  name: "BtDropdownButton",
  props: {
    values: {
      required: false,
      default: () => []
    }
  },
  data: function() {
    return {
      selected: 0
    };
  },
  computed: {
    hasValues: function() {
      return this.values.length > 0;
    },
    selectedItem: function() {
      return this.values[this.selected];
    }
  },
  methods: {
    selectOption(newOption) {
      if (this.selected != newOption) {
        this.selected = newOption;
        this.$emit("valueChanged", newOption);
      }
    }
  }
};
