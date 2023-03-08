import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";

import { Lazyload } from "vant";
import "./assets/main.css";

const app = createApp(App);
// const pinia = createPinia();
app.use(createPinia().use(piniaPluginPersistedstate));
// app.use(createPinia());
app.use(router);
app.use(Lazyload);

app.mount("#app");
