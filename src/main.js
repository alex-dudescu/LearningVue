import Vue from 'vue'
import App from './App.vue'

import router from 'Router/index'
import store from 'Store/index'
import bus from './mixins/bus.mixin'
import { utils }  from 'Utils/index'
import { repository } from 'API/Repository'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap'


new Vue({
  el: '#app',
  router,
  repository,
  store,
  utils,
  bus,
  BootstrapVue,
  render: h => h(App)
})


import './directives/drag';
import './directives/drop';