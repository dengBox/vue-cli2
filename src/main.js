// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import shUI from 'shsc-ui'
import 'shsc-ui/dist/shsc-ui.css'
// import {Input} from 'shsc-ui'
// Vue.component('Input', Input)
Vue.config.productionTip = false
Vue.use(shUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
