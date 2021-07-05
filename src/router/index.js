import { createWebHistory, createRouter } from "vue-router";
import LoginAndLogout from "../pages/LoginAndLogout.vue";
import HelloWorld from "../pages/HelloWorld.vue";
import Menu from "../pages/Menu.vue";
import CreateRoom from "../pages/CreateRoom.vue";
import EntryMember from "../pages/EntryMember.vue";

const routes = [
  {
    path: "/",
    name: "Top",
    components: { default: Menu, login: LoginAndLogout },
    props: { default: true, login: false },
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
  {
    path: "/wordWolf/createRoom/",
    name: "wordWolf-createRoom",
    components: { default: CreateRoom, login: LoginAndLogout },
    props: { default: true, login: false },
  },
  {
    path: "/wordWolf/:roomId",
    name: "wordWolf-roomId",
    components: { default: EntryMember, login: LoginAndLogout },
    props: { default: true, login: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
