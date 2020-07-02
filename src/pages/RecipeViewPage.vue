<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.name }}</h1>
        <img :src="recipe.pictureUrl" class="center"  />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div v-if="userFamily">
                <br>
                Family Member: {{recipe.familyMember}}
                <br>
                Event time: {{ recipe.cookingEventTime}}
<!--                <img class="family-photo" :src= "this.$root.store.familyRecipes.filter(r => r.id === recipe.id)[0].pictureMemberFood" alt="image" />-->
              </div>
              <img v-if="favorite(recipe) && !family(recipe)" :src="'https://img.icons8.com/cotton/64/000000/like--v3.png'" />
              <img v-if="favorite(recipe) === false && !family(recipe)" v-on:click=updateRecipeAsFavorite() :src="'https://img.icons8.com/cotton/64/000000/plus--v2.png'"  />
<!--              <img v-if="recipe.vegan" :src="'https://img.icons8.com/color/48/000000/vegan-symbol.png'"  />-->
<!--              <img v-if="recipe.vegetarian" :src="'https://img.icons8.com/color/48/000000/vegetarian-mark.png'"  />-->
              <div v-if="!userRecipe">
                <div>Likes: {{ recipe.likes }}  <b-icon icon="hand-thumbs-up"></b-icon></div>
              </div>
              <div> Number of meals: {{ recipe.numOfMeals }} meals</div>
              <b-icon icon="clock"></b-icon>
              {{ recipe.timeToCookInMinutes }} minutes
              <br>
              <ul style="list-style-type: none; margin: 0; padding: 0">
                <li style="animation:ease-in">
                  Vegan:
                  <!--                                <img v-if="recipe.vegan" :src="'https://res.cloudinary.com/dfboebsri/image/upload/v1593098818/vegan_icon_k8coge.png'" style="width: -10%"/>-->
                  <b-icon v-if="recipe.vegan === true" icon="check-circle"></b-icon>
                  <b-icon v-if="recipe.vegan === false " icon="x-circle"></b-icon>
                </li>
                <li>
                  Vegetarian:
                 <b-icon v-if="recipe.vegetarian" icon="check-circle"></b-icon>
                  <b-icon v-if="recipe.vegetarian === false" icon="x-circle"></b-icon>

                </li>
                <li>
                  Gluten Free:
                  <b-icon v-if="recipe.gluten === true " icon="check-circle"></b-icon>
                  <b-icon v-if="recipe.gluten === false" icon="x-circle"></b-icon>
                </li>
              </ul>

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
            <div>
            Instructions:
            <P v-html="recipe.instructions" ></P>
            </div>
            <div v-if="userFamily">
              <img class="family-photo" :src= "recipe.pictureMemberFood" alt="image" />
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
      recipe: null,
      userRecipe: false,
      userFamily: false
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
    // family(recipe) {
    //   let seen = this.$root.store.familyRecipes && this.$root.store.familyRecipes.some(r=> r.id === recipe.id);
    //   return seen;
    // },
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
          gluten: this.$route.params.gluten,
          familyMember: this.$route.params.familyMember,
          cookingEventTime: this.$route.params.cookingEventTime,
          pictureMemberFood: this.$route.params.pictureMemberFood,
        };
        this.recipe = _recipe;
        this.userRecipe = this.$route.params.userRecipe;
        this.userFamily = this.$route.params.userFamily;
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

.family-photo{
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 300px;
}
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
.container{
background-image: url("https://image.freepik.com/free-photo/grunge-vintage-old-paper-background_1373-431.jpg");
/*background-image: url("https://image.freepik.com/free-photo/wooden-board-surface-close-up_23-2148495716.jpg");*/
  height: 100%;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
