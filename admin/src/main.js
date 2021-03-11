import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import * as VueGoogleMaps from "vue2-google-maps";
import VueMapbox from "vue-mapbox";
import Mapbox from "mapbox-gl";

Vue.config.productionTip = false;

import "./main.scss";
Vue.use(VueMapbox, { mapboxgl: Mapbox });

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCTdgxCoIc5itDxDNd4cUIVq5blk5a3La0"
  },
  installComponents: true
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
