<template>
    <div>
        <b-container class="container">
            <h1 class="title">My Favorites</h1>
            <b-row>
                <b-col>
                    <RecipePreviewList
                            title="Favorites Recipes"
                            :recipesTemp="recipes"
                            :class="{
        // center: true
        center: true
      }"
                            style="width: 50%"
                    ></RecipePreviewList>
                </b-col>
            </b-row>
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
            this.updateMyRecipes();
            // this.updateWatchedRecipes();
        },
        methods: {
            async updateMyRecipes() {
                try {
                    const response = await this.axios.get(
                        "https://ass3-noa-noy.herokuapp.com/profile/favorites"
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
