import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import VueLazyLoad from "vue-lazyload";
import { Plugin } from "vue-fragment";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

Vue.config.productionTip = false;
Vue.use(VueLazyLoad);
Vue.use(Plugin);
Vue.use(Vuelidate);

const requireComponent = require.context(
  // The relative path of the components folder
  "./components/AppUnit",
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /App[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
  // Get component config
  const componentConfig = requireComponent(fileName);

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  );
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters["auth/loggedIn"]) {
      next({
        name: "login",
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
