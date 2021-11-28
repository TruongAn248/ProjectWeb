import { createWebHistory, createRouter } from "vue-router";
// import store from "../store";

const routes = [
   {
    path: "/",
    alias: "/homepage",
    name: "HomePage",
    component: () => import("../views/HomePage"),
  },
  {
    path: "/info/:id",
    name: "Info",
    component: () => import("../views/InfoView"),
  },
  {
    path: "/addcomic",
    name: "AddComic",
    component: () => import("../views/AddComic"),
  },
  {
    path: "/chap/:id",
    name: "ChapterView",
    component: () => import("../views/ChapterView"),
  },
  {
    path: "/comic/:id",
    name: "ComicEdit",
    component: () => import("../views/ComicEdit"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/UserLogin.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/UserRegister.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/UserProfile.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // const publicPages = ["/login", "/register","/"];
  // const authRequired = !publicPages.includes(to.path);
  // const loggedIn = store.getters.userLoggedIn;
  next();
  // if (authRequired && !loggedIn) {
  //   next();
  // } else {
  //   next();
  // }
});

export default router;