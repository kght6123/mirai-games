// vue
import { createApp } from "vue";
import App from "./App.vue";
// firebase
import firebase from "firebase/app";
import "firebase/auth";
import config from "../firebase.config";
// tailwind css
import "./tailwind.dist.css";
// stores
import fbAuthStore, { fbAuthStoreKey } from "./stores/auth";

// init firebase
firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// create app
const app = createApp(App);
app.provide(fbAuthStoreKey, fbAuthStore());
app.mount("#app");
