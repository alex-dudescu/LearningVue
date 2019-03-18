export default {
  name: "SiteHeader",
  data: function() {
    return {
      routes: []
    };
  },
  mounted() {
    this.routes = this.$router.options.routes;
  }
};
