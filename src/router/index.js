import { createWebHistory, createRouter } from "vue-router";
import LoginAndLogout from "../pages/LoginAndLogout.vue";
import HelloWorld from "../pages/HelloWorld.vue";

const routes = [
  {
    path: "/",
    name: "LoginAndLogout",
    component: LoginAndLogout,
  },
  {
    path: "/hello",
    name: "HelloWorld",
    component: HelloWorld,
  },
  // {
  //   path: "/hello/:msg",
  //   component: HelloWorld,
  //   props: true,
  // },
  {
    path: "/hello/:msg",
    components: { default: HelloWorld, login: LoginAndLogout },
    props: { default: true, login: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
