import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/home.vue";
import Share from "@/views/share.vue";
import ShowImg from "@/views/show-img.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/share",
    name: "Share",
    component: Share
  },
  {
    path: "/show-img",
    name: "ShowImg",
    component: ShowImg
  },
  {
    path: "*",
    redirect: "/home"
  }
];

const router = new VueRouter({
  routes
});

// router.beforeEach((to, from, next) => {
//   if (to.path === "/weixin" && from.path === "/") next("/");
//   next();
// });

export default router;
