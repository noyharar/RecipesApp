<template>
    <div class="list-recipes">
    <RecipePreviewList  style="width: auto"
            title="Last Viewed Recipes"
            :recipesTemp="watched"
            :class="{ center: true }"
    ></RecipePreviewList>
    </div>
</template>

<script>
    import RecipePreviewList from "./RecipePreviewList";

    export default {
        name: "WatchedRecipes",
        components: {
            RecipePreviewList
        },
        data() {
            return {
                watched:[],
            };
        },
        mounted() {
            this.updateWatchedRecipes();
            this.updateFavoriteRecipes();
            this.updateFamilyRecipes();
        },
        methods: {
            async updateWatchedRecipes() {
                if(!this.$root.store.username) {
                    return;
                }
                try {
                    const response = await this.axios.get(
                        "https://ass3-noa-noy.herokuapp.com/profile/watch"
                    );
                    // console.log(response);
                    const watchedRecipes = response.data;

                    this.watched = [];
                    if (watchedRecipes.length > 0) {
                        this.$root.store.addWatchedRecipes(watchedRecipes.map(r => r.id));
                        for (var i = 0; i < Math.min(3,watchedRecipes.length); i++) {
                            this.watched.push(watchedRecipes[i]);
                        }
                    } else {
                        this.$root.store.addWatchedRecipes([]);
                    }
                    console.log(this.watched);

                    // this.watched.push(...watchedRecipes);
                    // console.log(this.recipes);
                } catch (error) {
                    console.log(error);
                }
            },
            async updateFavoriteRecipes() {
                if (!this.$root.store.username) {
                    console.log("No username??");
                    return;
                }
                try {
                    const response = await this.axios.get(
                        "https://ass3-noa-noy.herokuapp.com/profile/favorites"
                    );
                    // console.log(response);
                    const favoriteRecipes = response.data;
                    if (favoriteRecipes.length > 0) {
                        this.$root.store.addFavoriteRecipes(favoriteRecipes.map(r => r.id));
                    } else {
                        this.$root.store.addFavoriteRecipes([]);
                    }
                    // this.watched.push(...watchedRecipes);
                    // console.log(this.recipes);
                } catch (error) {
                    console.log(error);
                }
            },
            async updateFamilyRecipes(){
                if (!this.$root.store.username) {
                    console.log("No username??");
                    return;
                }
                try {
                    const response = await this.axios.get(
                        "https://ass3-noa-noy.herokuapp.com/profile/family-recipes"
                    );
                    // console.log(response);
                    const familyRecipes = response.data;
                    if (familyRecipes.length > 0) {
                        this.$root.store.addFamilyeRecipes(familyRecipes);
                    } else {
                        this.$root.store.addFamilyeRecipes([]);
                    }
                    // this.watched.push(...watchedRecipes);
                    // console.log(this.recipes);
                } catch (error) {
                    console.log(error);
                }
            },
        }
    }
</script>

<style >
    /*.list-recipes{*/
    /*    width: 300px ;*/
    /*    margin: 0  auto;*/
    /*    !*float: right;*!*/
    /*}*/
</style>