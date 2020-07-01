<template>
    <div>
        <b-container class="container">
            <b-row>
                <b-col>
                    <RecipePreviewList
                            title="My Family's Recipes"
                            :recipesTemp="recipes"
                            :userRecipes=true
                            :class="{ center: true }"
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
        width: 50%;
    }
    .title{
        margin: auto;
        width: 40%;
        padding: 10px;    }
</style>
