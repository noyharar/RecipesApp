<template>
  <div>
  <router-link
    :to="{ name: 'recipe', params: {
      recipeId: recipe.id,
      recipeName: recipe.name,
      pictureUrl: recipe.pictureUrl,
      timeToCookInMinutes: recipe.timeToCookInMinutes,
      likes: recipe.likes,
      vegan: recipe.vegan,
      vegetarian: recipe.vegetarian,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      numOfMeals: recipe.numOfMeals,
    } }"
    class="recipe-preview"
  >
    <div class="recipe-body">
      <img :src="recipe.pictureUrl" class="recipe-image" />
    </div>
  </router-link>
  <div class="recipe-footer">
      <div :title="recipe.name" class="recipe-title">
        {{ recipe.name }}
      </div>
      <ul class="recipe-overview">
        <li>{{ recipe.timeToCookInMinutes }} minutes</li>
        <li>{{ recipe.likes }} likes</li>
      </ul>
      <footer>
          <img v-if="favorite(recipe) === true && this.$root.store.username" :src="'https://img.icons8.com/cotton/64/000000/like--v3.png'"  />
          <img v-if="favorite(recipe) === false && this.$root.store.username" v-on:click=addFavoriteRecipe() :src="'https://img.icons8.com/cotton/64/000000/plus--v2.png'"  />
          <img v-if="recipe.vegan" :src="'https://img.icons8.com/color/48/000000/vegan-symbol.png'" />
          <img v-if="recipe.vegetarian" :src="'https://img.icons8.com/color/48/000000/vegetarian-mark.png'"  />
          <img v-if="seen(recipe) === true" :src="'https://img.icons8.com/dusk/64/000000/check-all.png'"  />
  </footer>
    </div>
  </div>
</template>

<script>
import MainPage from "../pages/MainPage";

export default {
    name: "recipePreview",
    data() {
    return {
    };
  },
  methods: {
    seen(recipe) {
      let seen = this.$root.store.watchedRecipes && this.$root.store.watchedRecipes.includes(recipe.id);
      // console.log("Watched: " + seen);
      return seen;
    },
    favorite(recipe) {

      let favorite = this.$root.store.favoriteRecipes && this.$root.store.favoriteRecipes.includes(recipe.id);
      return favorite;
    },
    async addFavoriteRecipe() {
      try {
        if(!this.$root.store.username) {
          return;
        }
        this.$root.store.addFavoriteOneRecipe(this.recipe.id);
        const response = await this.axios.post(
                "https://ass3-noa-noy.herokuapp.com/profile/favorites",
                {
                  id: this.recipe.id,
                },
                {
                  withCredentials: true
                }
        );
        this.favorite(this.recipe.id);
      } catch (error) {
        console.log(error);
      }
    },
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
  },
    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }

};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
</style>
