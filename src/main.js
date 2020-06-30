import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";


import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
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

const shared_data = {
  username: localStorage.username,
  watchedRecipes: localStorage.watchedRecipes ? JSON.parse(localStorage.watchedRecipes) : [],
  favoriteRecipes: localStorage.favoriteRecipes ? JSON.parse(localStorage.favoriteRecipes) : [],
  familyRecipes: localStorage.familyRecipes ? JSON.parse(localStorage.familyRecipes) : [],
  lastSearch: localStorage.lastSearch ? JSON.parse(localStorage.lastSearch) : {},

  addLastSearch(i_lastSearch){
    localStorage.setItem("lastSearch", JSON.stringify(i_lastSearch));
    this.lastSearch = i_lastSearch;
    // }
  },

  addWatchedOneRecipe(watchedRecipe){
    let item = localStorage.watchedRecipes;
    let current = item ? JSON.parse(item) : [];
    if(!current.includes(watchedRecipe)) {
      current.push(watchedRecipe);
      localStorage.setItem("watchedRecipes",JSON.stringify(current));
      this.watchedRecipes = current;
    }
  },
  addWatchedRecipes(watchedRecipes){
    localStorage.setItem("watchedRecipes", JSON.stringify(watchedRecipes));
    this.watchedRecipes = watchedRecipes;
    // }
  },
  addFavoriteOneRecipe(favoriteRecipe) {
    let item = localStorage.favoriteRecipes;
    let current = item ? JSON.parse(item) : [];
    if(!current.includes(favoriteRecipe)) {
      current.push(favoriteRecipe);
      localStorage.setItem("favoriteRecipes",JSON.stringify(current));
      this.favoriteRecipes = current;
    }
  },
  addFavoriteRecipes(favoriteRecipes){
    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
    this.favoriteRecipes = favoriteRecipes;
  },
  addFamilyeRecipes(familyRecipes){
    localStorage.setItem("familyRecipes", JSON.stringify(familyRecipes));
    this.familyRecipes = familyRecipes;
  },
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.removeItem("watchedRecipes");
    localStorage.removeItem("favoriteRecipes");
    localStorage.removeItem("familyRecipes");
    localStorage.removeItem("lastSearch");
    this.username = undefined;
    this.watchedRecipes = undefined;
    this.favoriteRecipes = undefined;
    this.lastSearch = undefined;
  },
};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

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
