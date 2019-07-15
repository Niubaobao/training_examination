import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Video from "video.js";
import "video.js/dist/video-js.css";
import VConsole from "vconsole";
Vue.prototype.$video = Video;

new VConsole();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
