import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// no longer needed for Vue 3.3 anymore
// app.config.unwrapInjectedRef = true;

app.mount("#app");
