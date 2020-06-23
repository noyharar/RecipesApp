<template>
    <div id="app">
        <div id="nav">
            <b-navbar class="bd-navbar" type="dark">
                <b-navbar-brand tag="h1" class="mb-0">Recipes</b-navbar-brand>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item to="/">
                            <b-icon
                                    align="left"
                                    shift-v="-12"
                                    icon="house"
                            ></b-icon>
                        </b-nav-item>

                            <b-nav-item to="/search" align="right"><b-icon
                                    align="left"
                                    shift-v="-12"
                                    icon="search"
                            ></b-icon></b-nav-item>


                        <b-nav-item to="/about"><b-icon
                                align="left"
                                shift-v="-12"
                                icon="info-circle"
                        ></b-icon></b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto">
            <span v-if="!$root.store.username">
              <b-navbar-nav>
                <b-icon
                        align="bottom"
                        shift-v="-12"
                        icon="person-circle"
                ></b-icon>

                <b-nav-text><b>Hello Guest:</b></b-nav-text>
                <b-nav-item to="/register" right>Register</b-nav-item>
                <b-nav-item to="/login" right>Login</b-nav-item>
              </b-navbar-nav>
            </span>
                        <span v-else>
              <b-navbar-nav>
                <b-icon
                        align="bottom"
                        shift-v="-12"
                        animation="throb"
                        icon="person-circle"
                ></b-icon>
                <b-nav-text class="mb-0"
                ><b> hello, {{ $root.store.username }}: </b></b-nav-text
                >
                <b-nav-item-dropdown
                        id="my-nav-dropdown"
                        text="Profile"
                        toggle-class="nav-link-custom" right>
                  <b-dropdown-item to="/favoritesRecipes"
                  >My Favorites Recipes</b-dropdown-item
                  >
                  <b-dropdown-item to="/myRecipes"
                  >My Recipes</b-dropdown-item
                  >
                  <b-dropdown-item to="/familyRecipes"
                  >My Family's Recipes</b-dropdown-item
                  >
                </b-nav-item-dropdown>
                <b-nav-form>
                  <b-button variant="outline-light" @click="Logout"
                  >Logout</b-button
                  >
                </b-nav-form>
              </b-navbar-nav>
            </span>
                    </b-navbar-nav>
                    <!-- Navbar dropdowns -->
                </b-collapse>
            </b-navbar>
        </div>
        <router-view />
    </div>
</template>

<!--<template>-->
<!--    <div id="app">-->
<!--        <div id="nav">-->
<!--            <router-link :to="{ name: 'main' }">Recipes</router-link>-->
<!--            |-->
<!--            <router-link :to="{ name: 'search' }">Search</router-link>-->
<!--            |-->
<!--            <router-link :to="{ name: 'About' }">About</router-link>-->
<!--            |-->
<!--            &lt;!&ndash;      {{ !$root.store.username }}&ndash;&gt;-->
<!--            <span v-if="!$root.store.username">-->

<!--        <b-nav-text><b>Hello Guest:</b></b-nav-text>-->
<!--        <router-link :to="{ name: 'register' }">Register</router-link>|-->
<!--        <router-link :to="{ name: 'login' }">Login</router-link>|-->
<!--      </span>-->
<!--          <span v-else>-->
<!--&lt;!&ndash;              <dropdown :config="config"></dropdown>&ndash;&gt;-->
<!--          <dropdown :config="config" @setSelectedOption="setNewSelectedOption($event)"></dropdown>-->
<!--        <router-link :to="{ name: 'myRecipes' }">My Recipes</router-link>-->
<!--        <router-link :to="{ name: 'favoritesRecipes' }">My Favorites Recipes</router-link>-->
<!--        <router-link :to="{ name: 'familyRecipes' }" tag="button">My Family's Recipes</router-link>-->
<!--        {{ $root.store.username }}: <button @click="Logout">Logout</button>|-->
<!--      </span>-->
<!--        </div>-->
<!--        <router-view/>-->
<!--    </div>-->
<!--</template>-->


<script>
    import dropdown from "./components/dropdown";

    export default {
        name: "App",
        data: function() {
            return {
                config: {
                    options: [
                        {value: "myRecipes"},
                        {value: "favoritesRecipes"},
                        {value: "familyRecipes"}],
                    placeholder: "Profile",
                    backgroundColor: "#cde4f5",
                    textColor: "black",
                    borderRadius: "1.5em",
                    border: "1px solid gray",
                    width: 180
                }
            };
        },
        methods: {
            Logout() {
                this.$root.store.logout();
                this.$root.toast("Logout", "User logged out successfully", "success");

                this.$router.push("/").catch(() => {
                    this.$forceUpdate();
                });
            }
            ,
            setNewSelectedOption(selectedOption) {
                this.config.placeholder = selectedOption.value;
            }
        },
        components: {
            // dropdown
        }
    }
</script>

<style lang="scss">
    @import "./scss/form-style.scss";

</style>
