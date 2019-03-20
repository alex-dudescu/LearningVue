// Create a bus channel for the event system
import Vue from 'vue'

Vue.mixin({
    beforeCreate() {
        const options = this.$options;
        if(options.bus)
        this.$bus = options.bus
        else if (options.parent && options.parent.$bus)
        this.$bus = options.parent.$bus;
    }
})

const bus = new Vue({});
export default bus