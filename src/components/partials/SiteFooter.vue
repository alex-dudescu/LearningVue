<template>
  <footer>
    <!-- <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12" :v-if="isPageScrollable">Footer</div>
      </div>
    </div> -->
  </footer>
</template>

<script>
export default {
  name: "SiteFooter",
  computed: {
    isPageScrollable: function() {
      return this.$utils.isPageScrollable();
    }
  },
  methods: {
      onPageResized() {
          onresize(this)
      }
  }
};
</script>

<style lang="scss" scoped>
footer {
  background-color: gainsboro;
}
</style>
