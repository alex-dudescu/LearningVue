export default {
  name: "BtCard",
  data: function() {
    return {
      innerHtml: ""
    };
  },
  props: {
    cardTitle: String,
    cardSubtitle: String,
    cardButtons: [],
    cardLinks: undefined
  }
};
