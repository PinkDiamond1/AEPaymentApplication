/* eslint-disable no-console */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import Globals from './globals'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { LayoutPlugin, ModalPlugin, ButtonPlugin } from 'bootstrap-vue'
import { sync } from 'vuex-router-sync'

window.eventBus = new Vue();

Vue.use(ButtonPlugin)
Vue.use(LayoutPlugin)
Vue.use(ModalPlugin)
Vue.config.productionTip = false

console.log("==== The AE Universe One Client Application  Version " + process.env.VUE_APP_VERSION +
  " (" + process.env.VUE_APP_RELEASE_DATE + ") ====");
console.log("Process env:");
console.log(process.env)

Vue.mixin(Globals);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueSweetalert2)

sync(store, router)