import { createRouter, createWebHistory } from "vue-router";
import Todo from "../pages/Todo.vue";
import Hangman from "../pages/Hangman.vue";

const routes = [
  {
    path: "/",
    name: "Todo",
    component: Todo,
  },
  {
    path: "/hangman",
    name: "Hangman",
    component: Hangman,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
