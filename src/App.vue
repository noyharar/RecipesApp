<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }">Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
       <router-link :to="{ name: 'About' }">About</router-link>|
<!--      {{ !$root.store.username }}-->
      <span v-if="!$root.store.username">

        <b-nav-text><b>Hello Guest:</b></b-nav-text>
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
        <router-link :to="{ name: 'myRecipes' }">My Recipes</router-link>|
        <router-link :to="{ name: 'favoritesRecipes' }">My Favorites Recipes</router-link>|
        <router-link :to="{ name: 'familyRecipes' }">My Family's Recipes</router-link>|
        {{ $root.store.username }}: <button @click="Logout">Logout</button>|
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "./scss/form-style.scss";

</style>
