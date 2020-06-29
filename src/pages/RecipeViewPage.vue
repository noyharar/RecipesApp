<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.name }}</h1>
        <img :src="recipe.pictureUrl" class=".center"  />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <img v-if="favorite(recipe)" :src="'https://img.icons8.com/cotton/64/000000/like--v3.png'" />
              <img v-if="favorite(recipe) === false" v-on:click=updateRecipeAsFavorite() :src="'https://img.icons8.com/cotton/64/000000/plus--v2.png'"  />
              <img v-if="recipe.vegan" :src="'https://img.icons8.com/color/48/000000/vegan-symbol.png'"  />
              <img v-if="recipe.vegetarian" :src="'https://img.icons8.com/color/48/000000/vegetarian-mark.png'"  />
             <div>Ready in {{ recipe.timeToCookInMinutes }} minutes</div>
              <div>Likes: {{ recipe.likes }} likes</div>
              <div> Number of meals: {{ recipe.numOfMeals }} meals</div>
            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.ingredients"
                :key="index + '_' + r.name"
              >
                {{ r.name }}
                {{ r.amount}}
                {{ r.unit}}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <P v-html="recipe.instructions" ></P>
            <div v-if="family(recipe)">
            <br>
            Family Member: {{ this.$root.store.familyRecipes.filter(r => r.id == recipe.id)[0].familyMember}}
            <br>
            Event time: {{ this.$root.store.familyRecipes.filter(r => r.id == recipe.id)[0].cookingEventTime}}
            <img class="family-photo" :src= "this.$root.store.familyRecipes.filter(r => r.id === recipe.id)[0].pictureMemberFood" alt="image" />

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      recipe: null
    };
  },

  mounted() {
    this.updateRecipeAsWatched()
  },
  methods: {
    async updateRecipeAsWatched() {
      try {
        if(!this.$root.store.username) {
          return;
        }
        this.$root.store.addWatchedOneRecipe(this.recipe.id);
        const response = await this.axios.post(
                "https://ass3-noa-noy.herokuapp.com/profile/watch",
                {
                  id: this.recipe.id,
                },
                {
                  withCredentials: true
                }
        );
      } catch (error) {
        console.log(error);
      }
    },
    favorite(recipe) {
      let seen = this.$root.store.favoritesRecipes && this.$root.store.favoritesRecipes.includes(recipe.id);
      return seen;
    },
    family(recipe) {
      let seen = this.$root.store.familyRecipes && this.$root.store.familyRecipes.some(r=> r.id === recipe.id);
      return seen;
    },
  async updateRecipeAsFavorite() {
    if(!this.$root.store.username) {
      return;
    }
    try {
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
    } catch (error) {
      console.log(error);
    }
},
  },
    async created() {
      try {
        let _recipe = {
          id: this.$route.params.recipeId,
          name: this.$route.params.recipeName,
          pictureUrl: this.$route.params.pictureUrl,
          timeToCookInMinutes: this.$route.params.timeToCookInMinutes,
          likes: this.$route.params.likes,
          ingredients: this.$route.params.ingredients,
          instructions: this.$route.params.instructions,
          numOfMeals: this.$route.params.numOfMeals,
          vegan: this.$route.params.vegan,
          vegetarian: this.$route.params.vegetarian,
        };
        this.recipe = _recipe;
      } catch (error) {
        console.log(error);
      }
    }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

/*.family-photo{*/
.recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 30%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}
/* .recipe-header{

} */
</style>
