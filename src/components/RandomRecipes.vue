<template>
 <div class="list-recipes">
  <RecipePreviewList  style="width: auto"
          title="Explore these recipes"
          :recipesTemp="recipes"
          :class="{ right: true }"
  ></RecipePreviewList>
  <br>
  <br>
  <button v-on:click="updateRecipes()" type="button" class="btn btn-primary btn-sm">Random</button>
 </div>
</template>

<script>
 import RecipePreviewList from "./RecipePreviewList";

 export default {
  name: "RandomRecipes",
  components: {
   RecipePreviewList
  },
  data() {
   return {
    recipes:[],
   };
  },
  mounted() {
   this.updateRecipes();
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
   }
  }
 }
</script>

<style >

/*.list-recipes{*/
/* width: 300px ;*/
/* margin: 0  auto;*/
/* float: left;*/
/*}*/
</style>