import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faSquare } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faSquare);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

// no longer needed for Vue 3.3 anymore
// app.config.unwrapInjectedRef = true;

app.mount("#app");
