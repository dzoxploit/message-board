import { createRouter, createWebHistory } from "vue-router";
import AddMessage from "../views/AddMessage";
import EditMessage from "../views/EditMessage";
import MessageList from "../views/MessageList.vue";

const routes = [
  {
    path: "/",
    name: "MessageList",
    component: MessageList,
  },
  {
    path: "/create",
    name: "AddMessage",
    component: AddMessage,
  },
  {
    path: "/edit/:id",
    name: "EditMessage",
    component: EditMessage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
