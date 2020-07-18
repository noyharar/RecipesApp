import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";

const shared_data = {
  BASE_URL: "http://localhost:8888",
  username: localStorage.username,
  watchedRecipes: [],
  favoriteRecipes: [],
  lastSearch: localStorage.lastSearch ? JSON.parse(localStorage.lastSearch) : null,

  addLastSearch(i_lastSearch){
    localStorage.setItem("lastSearch", JSON.stringify(i_lastSearch));
    this.lastSearch = i_lastSearch;
  },
  addWatchedOneRecipe(watchedRecipe){
    if(!this.watchedRecipes.includes(watchedRecipe)) {
      this.watchedRecipes.push(watchedRecipe);
    }
  },
  addWatchedRecipes(watchedRecipes){
    this.watchedRecipes = watchedRecipes;
  },
  addFavoriteOneRecipe(favoriteRecipe) {
    if(!this.favoriteRecipes.includes(favoriteRecipe)) {
      this.favoriteRecipes.push(favoriteRecipe);
    }
  },
  addFavoriteRecipes(favoriteRecipes){
    this.favoriteRecipes = favoriteRecipes;
  },
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.removeItem("lastSearch");
    this.username = undefined;
    this.watchedRecipes = undefined;
    this.favoriteRecipes = undefined;
    this.lastSearch = undefined;
  },
};
console.log(shared_data);
import routes from "./routes";
import VueRouter from "vue-router";
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // if there was a transition from logged in to session expired or localStorage was deleted
  // if we try to enter auth required pages and we are not authorized
  if (shared_data.username === undefined || !Vue.$cookies.get("session")) {
    
    if (
      (shared_data.username === undefined && Vue.$cookies.get("session")) ||
      (shared_data.username !== undefined && !Vue.$cookies.get("session"))
    ) {
      shared_data.logout();
    }
    // if the route requires Authorization, (and we know the user is not authorized), we redirect to login page
    if (to.matched.some((route) => route.meta.requiresAuth)) {
      next({ name: "main" });
    } else next();
  } else next();
});







import VueDropdown from "vue-dynamic-dropdown";
Vue.use(VueDropdown);

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;



new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-left",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
