import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import axios
import axios from "axios";
//import Bootstrap, Popper, jQuery
import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery.min";
import "popper.js/dist/popper.min";
import "bootstrap/dist/js/bootstrap.min";

// define baseURL
axios.defaults.baseURL = "http://localhost:8000/api/";

createApp(App).use(router).mount("#app");
