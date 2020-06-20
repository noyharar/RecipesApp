<template>
  <div>
  <b-container class="container">
    <h1 class="title">Main Page</h1>
    <b-row>
      <b-col>
        <RecipePreviewList
                title="Random Recipes"
                :recipesTemp="recipes"
                :class="{
        // center: true
        right: true
      }"
        ></RecipePreviewList>
        <button v-on:click="updateRecipes()" type="button" class="btn btn-primary btn-sm">Random</button>
      </b-col>
      <b-col v-if="!this.$root.store.username">
        <Login></Login>
      </b-col>
      <b-col>
        <RecipePreviewList v-if="this.$root.store.username"
                title="Last Viewed Recipes"
                :recipesTemp="watched"
                :class="{
        // blur: !$root.store.username,
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
    Viewed:
    <img :src="'https://img.icons8.com/dusk/64/000000/check-all.png'"/>
    Add to favorites:
    <img :src="'https://img.icons8.com/cotton/64/000000/plus--v2.png'"  />
    Favorites:
    <img :src="'https://img.icons8.com/cotton/64/000000/like--v3.png'"  />

  </b-container>
</div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import Login from "./LoginPage";
export default {
  components: {
    Login,
    RecipePreviewList
  },
    data() {
    return {
      recipes: [],
      watched:[],
    };
  },
  mounted() {
    this.updateRecipes();
    this.updateWatchedRecipes();
    this.updateFavoriteRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
                "https://ass3-noa-noy.herokuapp.com/recipes/random"
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
