import Vue from 'vue'
import App from './App.vue'

import router from 'Router/index'
import store from 'Store/index'
import { utils }  from 'Utils/index'
import { repository } from 'API/Repository'

import 'bootstrap'

new Vue({
  el: '#app',
  router,
  repository,
  store,
  utils,
  render: h => h(App)
})
