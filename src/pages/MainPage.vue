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
      <b-col v-if="!$root.store.username">
        <Login></Login>
      </b-col>
      <b-col>
        <RecipePreviewList v-if="$root.store.username"
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
      watched:[]
    };
  },
  mounted() {
    this.updateRecipes();
    this.updateWatchedRecipes();
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
      try {
        const response = await this.axios.get(
                "https://ass3-noa-noy.herokuapp.com/profile/watch"
        );

        // console.log(response);
        const watchedRecipes = response.data;
        this.watched = [];
        for(var i = 0; i < 3 ; i ++){
          this.watched.push(watchedRecipes[i]);
        }
        console.log(this.watched);

        // this.watched.push(...watchedRecipes);
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    }
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
