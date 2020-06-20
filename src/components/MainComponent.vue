<template>
    <b-container class="container">
        <h1 class="title">Main Page</h1>
        <b-row>
            <b-col>
                <RandomRecipes></RandomRecipes>
            </b-col>
            <b-col>
                <LoginPage :from-main-page=true v-if="!this.$root.store.username"></LoginPage>
                <WatchedRecipes v-if="this.$root.store.username"></WatchedRecipes>
            </b-col>
        </b-row>
        <!--    <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>-->
        <!--    {{ !$root.store.username }}-->
        Vegen:
        <img :src="'https://img.icons8.com/color/48/000000/vegan-symbol.png'" />
        Vegetarian:
        <img :src="'https://img.icons8.com/color/48/000000/vegetarian-mark.png'" />
        Viewed:
        <img :src="'https://img.icons8.com/dusk/64/000000/check-all.png'"/>
        Add to favorites:
        <img :src="'https://img.icons8.com/cotton/64/000000/plus--v2.png'"  />
        Favorites:
        <img :src="'https://img.icons8.com/cotton/64/000000/like--v3.png'"  />
    </b-container>
</template>

<script>
    import RandomRecipes from "./RandomRecipes";
    import LoginPage from "../pages/LoginPage";
    import WatchedRecipes from "./WatchedRecipes";

    export default {
        name: "MainComponent",
        props: {
            loggedInUser: {
                type: String,
                required: true
            }
        },
        components: {
            RandomRecipes,
            LoginPage,
            WatchedRecipes,
        }
    }
</script>

<style lang="scss" scoped>
    .RandomRecipes {
        margin: 10px 0 10px;
    }
    .blur {
        -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
        filter: blur(2px);
    }
    ::v-deep .blur .recipe-preview {
        pointer-events: none;
        cursor: default;
    }

</style>