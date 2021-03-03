import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import store from "./store";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import "./scss/main.scss";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
