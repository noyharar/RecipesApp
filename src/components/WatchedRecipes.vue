<template>
    <div class="list-recipes">
        <h3 style="text-align: center;
  text-shadow: -2px 0 white, 0 2px white, 2px 0 white, 0 -2px white;;
">Last Viewed Recipes</h3>
    <RecipePreviewList  style="width: auto"
                        title=""
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
            console.log("watched rec")
            this.updateWatchedRecipes();
            this.updateFavoriteRecipes();
            // this.updateFamilyRecipes();
        },
        methods: {
            async updateWatchedRecipes() {
                console.log("start",this.$root.store.username)
                if(!this.$root.store.username) {
                    return;
                }
                try {
                    const response = await this.axios.get(
                        this.$root.store.BASE_URL + "/profile/watch"
                    );
                    console.log(123,response);
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
                        this.$root.store.BASE_URL + "/profile/favorites"
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
            // async updateFamilyRecipes(){
            //     if (!this.$root.store.username) {
            //         console.log("No username??");
            //         return;
            //     }
            //     try {
            //         const response = await this.axios.get(
            //             this.$root.store.BASE_URL + "/profile/family-recipes"
            //         );
            //         // console.log(response);
            //         const familyRecipes = response.data;
            //         if (familyRecipes.length > 0) {
            //             this.$root.store.addFamilyeRecipes(familyRecipes);
            //         } else {
            //             this.$root.store.addFamilyeRecipes([]);
            //         }
            //         // this.watched.push(...watchedRecipes);
            //         // console.log(this.recipes);
            //     } catch (error) {
            //         console.log(error);
            //     }
            // },
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