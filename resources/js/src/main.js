import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import store from "./store";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./scss/main.scss";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
