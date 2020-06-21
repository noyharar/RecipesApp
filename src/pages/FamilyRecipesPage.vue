<template>
    <div>
        <b-container class="container">
            <h1 class="title">My Recipes</h1>
            <b-row>
                <b-col>
                    <RecipePreviewList
                            title="My Family's Recipes"
                            :recipesTemp="recipes"
                            :class="{
        // center: true
        center: true
      }"
                    ></RecipePreviewList>
                </b-col>
            </b-row>
            <!--    <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>-->
            <!--    {{ !$root.store.username }}-->
            Vegen:
            <img :src="'https://img.icons8.com/color/48/000000/vegan-symbol.png'" />
            Vegetarian:
            <img :src="'https://img.icons8.com/color/48/000000/vegetarian-mark.png'" />
        </b-container>
    </div>
</template>

<script>
    import RecipePreviewList from "../components/RecipePreviewList";
    // import Login from "./LoginPage";
    export default {
        components: {
            // Login,
            RecipePreviewList
        },
        data() {
            return {
                recipes: []
            };
        },
        mounted() {
            this.updateFamilyRecipes();
            // this.updateWatchedRecipes();
        },
        methods: {
            async updateFamilyRecipes() {
                try {
                    const response = await this.axios.get(
                        "https://ass3-noa-noy.herokuapp.com/profile/family-recipes"
                    );

                    // console.log(response);
                    const recipes = response.data;
                    this.recipes = [];
                    this.recipes.push(...recipes);
                    // console.log(this.recipes);
                } catch (error) {
                    console.log(error);
                }
            },
        }
    };
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
