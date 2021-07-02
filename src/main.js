import { createApp } from "vue";
import firebase from "firebase/app";
import "firebase/auth";
import App from "./App.vue";
import "./tailwind.dist.css";
import config from "../firebase.config";

firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

createApp(App).mount("#app");
