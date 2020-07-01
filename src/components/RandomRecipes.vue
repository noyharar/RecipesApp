<template>
 <div class="list-recipes">
  <h3 style="text-align: center;
  text-shadow: -2px 0 white, 0 2px white, 2px 0 white, 0 -2px white;;
">Explore these recipes</h3>
  <RecipePreviewList  style="width: auto"
          title=""
          :recipesTemp="recipes"
          :class="{ right: true }"
  ></RecipePreviewList>
  <br>
  <footer>
  <div class="random-btn">
  <button v-on:click="updateRecipes()" type="button" class="btn btn-dark btn-lg btn-block">Random</button>
   <br>
  </div>
  </footer>
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
 .random-btn{
  position: inherit;
  margin-left: 100px;
  margin-right: 150px; }
/*.list-recipes{*/
/* width: 300px ;*/
/* margin: 0  auto;*/
/* float: left;*/
/*}*/
</style>