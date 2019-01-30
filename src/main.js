// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '../store'
import * as VueGoogleMaps from "vue2-google-maps";
import vSelect from 'vue-select'
import FBSignInButton from 'vue-facebook-signin-button'

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA2oXySLjVrmLn6tAzy7wQWZrKqnBao0Y0",
    libraries: "places,drawing,visualization"
  }
});

Vue.config.productionTip = false
Vue.use(require('vue-moment'));

Vue.component('v-select', vSelect)

Vue.use(FBSignInButton)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
