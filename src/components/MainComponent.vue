<template>
    <div class="main-class">
    <b-container class="container">
        <h1 class="title"><b>Main Page</b></h1>
        <b-row >
            <b-col class="try">
                <RandomRecipes >Explore these recipes</RandomRecipes>
            </b-col>
            <b-col>
                <LoginPage :from-main-page=true v-if="!this.$root.store.username"></LoginPage>
                <WatchedRecipes v-if="this.$root.store.username"></WatchedRecipes>
            </b-col>
        </b-row>
        <!--    <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>-->
        <!--    {{ !$root.store.username }}-->
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

    </b-container>
    </div>
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
    /*.main-class{*/
    /*    !*!*position: inherit;*!*!*/
    /*    !*margin-left: 100px;*!*/
    /*    !*margin-right: 150px;*!*/
    /*}*/
    /*.try{*/
    /*    mergin-left: auto;*/
    /*}*/
    /*.RandomRecipes {*/
    /*    margin: 10px 0 10px;*/
    /*}*/
    .blur {
        -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
        filter: blur(2px);
    }
    ::v-deep .blur .recipe-preview {
        pointer-events: none;
        cursor: default;
    }
    .container{
        max-width: 875px;
    }
    .title{
        margin: auto;
        width: 33%;
        padding: 10px;
        text-shadow: 2px 2px 4px black;
    }
</style>