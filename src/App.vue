<template>
    <div id="app">
        <div id="nav">
            <b-navbar class="bd-navbar" type="dark">
                <b-navbar-brand tag="h1" class="mb-0"><b>EVERYBODY COOKS NOW</b></b-navbar-brand>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item to="/">
                            <p class="h3 mb-2">
                            <b-icon
                                    align="left"
                                    shift-v="-3"
                                    icon="house"
                                    style="color: white;"
                            ></b-icon></p>
                        </b-nav-item>
                            <b-nav-item :to="{name: 'search'}" align="right">
                                <p class="h3 mb-2">
                                <b-icon
                                    align="left"
                                    shift-v="-3"
                                    icon="search"
                                    style="color: white;"
                            ></b-icon></p></b-nav-item>


                        <b-nav-item to="/about">
                            <p class="h3 mb-2">
                            <b-icon
                                align="left"
                                shift-v="-3"
                                icon="info-circle"
                                style="color: white;"
                            ></b-icon></p></b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto">
            <span v-if="!$root.store.username">
              <b-navbar-nav>
                  <p class="h3 mb-2">
                <b-icon
                        align="left"
                        shift-v="-1"
                        shift-h="-3"
                        icon="person-circle"
                        style="color: white;"
                ></b-icon>
                  </p>
                  <p>
                <b-nav-text style="color: white;"><b>   Hello Guest   </b></b-nav-text>
                      </p>
                <b-nav-item class="nav-item"  to="/register" right>Register</b-nav-item>
                <b-nav-item to="/login" right>Login</b-nav-item>
                    </b-navbar-nav>

            </span>
                        <span v-else>
              <b-navbar-nav>
                  <p class="h3 mb-2">

                <b-icon
                        align="bottom"
                        shift-v="-3"
                        animation="throb"
                        icon="person-circle"
                        style="color: white"
                ></b-icon></p>
                <b-nav-text class="mb-0"
                ><b> Hello, {{ $root.store.username }}: </b></b-nav-text
                >
                <b-nav-item-dropdown
                        id="my-nav-dropdown"
                        text="Profile"
                        toggle-class="nav-link-custom" right>
                      <b-dropdown-item to="/profile"
                      >My Profile</b-dropdown-item
                      >
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
        <footer class="footerClass">
            &copy; All Rights Reserved to Noa Gorengot and Noy Harari
        </footer>
<!--        <footer class="footerClass">-->
<!--        Vegen:-->
<!--        <img :src="'https://img.icons8.com/color/48/000000/vegan-symbol.png'" width="3%"/>-->
<!--        Vegetarian:-->
<!--        <img :src="'https://img.icons8.com/color/48/000000/vegetarian-mark.png'" width="3%"/>-->
<!--        GlutenFree:-->
<!--        <img :src="'https://img.icons8.com/plasticine/100/000000/no-gluten.png'" width="3%"/>-->
<!--        Viewed:-->
<!--        <img :src="'https://img.icons8.com/color/48/000000/visible.png'" width="3%"/>-->
<!--        Add to favorites:-->
<!--        <img :src="'https://img.icons8.com/cotton/64/000000/plus&#45;&#45;v2.png'" width="3%"/>-->
<!--        Favorites:-->
<!--        <img :src="'https://img.icons8.com/cotton/64/000000/like&#45;&#45;v3.png'" width="3%"/>-->
<!--        </footer>-->
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
    .footerClass{
        position: fixed;
        min-height: 30px;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color:   brown;
        color: white;
        min-height: auto;
        font-size: 11px;
        font-weight: bolder;
    }
</style>
