import Vue from 'vue'
import Layout from './components/layout'
import VueResource from 'vue-resource'
import router from './router'
import store from './store' 
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store ,
  template: '<Layout/>',
  components: { Layout }
})
