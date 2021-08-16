import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueLazyLoad from 'vue-lazyload';
import { Plugin } from 'vue-fragment';


Vue.config.productionTip = false;
Vue.use(VueLazyLoad)
Vue.use(Plugin);

new Vue({
  router,
  store,
  vuetify,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
