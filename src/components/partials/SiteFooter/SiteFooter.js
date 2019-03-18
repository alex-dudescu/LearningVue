export default {
  name: "SiteFooter",
  computed: {
    isPageScrollable: function() {
      return this.$utils.isPageScrollable();
    }
  },
  methods: {
    onPageResized() {
      onresize(this);
    }
  }
};
