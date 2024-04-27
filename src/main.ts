import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "@/assets/scss/styles.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import { router } from "@/router";

//@ts-ignore
import { createVuetify } from "vuetify";
//@ts-ignore
import * as components from "vuetify/components";
//@ts-ignore
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount("#app");
