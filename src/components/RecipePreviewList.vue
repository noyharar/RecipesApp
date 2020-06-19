<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row v-for="r in recipesTemp" :key="r.id">
      <b-col>
        <RecipePreview class="recipePreview" :recipe="r" />
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
  //         "https://ass3-noa-noy.herokuapp.com/recipes/random"
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
  min-height: 400px;
}
</style>
