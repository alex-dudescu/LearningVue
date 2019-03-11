import Vue from "vue";
import $ from "jquery"

Vue.mixin({
  beforeCreate() {
    const options = this.$options;
    
    if (options.utils) 
      this.$utils = options.utils;
    else if (options.parent && options.parent.$utils)
      this.$utils = options.parent.$utils;
  }
});

export const utils = {
  
  isPageScrollable: function() {
      return $('body').height() > $(window).height();
  }
}
