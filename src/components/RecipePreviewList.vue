<template>
  <b-container>
    <h1 class="title" ><b>
      {{ title }}
    </b>
      <slot></slot>
    </h1>
    <b-row v-for="r in recipesTemp" :key="r.id">
      <b-col>
        <RecipePreview class="recipePreview" :recipe="r" :userRecipe="userRecipes" :userFamily="familyRecipes" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    recipesTemp: {
      type: Array,
      required: false
    },
    userRecipes: {
      type: Boolean,
      required: false
    },
    familyRecipes: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  // mounted() {
  //   this.updateRecipes();
  // },
  // methods: {
  //   async updateRecipes() {
  //     try {
  //       const response = await this.axios.get(
  //         this.$root.store.BASE_URL + "/recipes/random"
  //       );
  //
  //       // console.log(response);
  //       const recipes = response.data;
  //       this.recipes = [];
  //       this.recipes.push(...recipes);
  //       // console.log(this.recipes);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 600px;
}
.title{
  margin: auto;
  width: 80%;
  padding: 10px;
  text-shadow: 2px 2px 4px black;
}
</style>
