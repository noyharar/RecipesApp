<template>
  <div class="container">
    <h1 class="title">Search</h1>
    <!--<div v-if="$root.store.username" :v-on="initLastSearch()"> </div>-->
    <b-form @submit.prevent="onSearch">
      <b-form-group
        id="input-group-query"
        label-cols-sm="3"
        label="Query:"
        label-for="query"
      >
        <b-form-input
          id="query"
          v-model="$v.form.query.$model"
          type="text"
          :state="validateState('query')"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-number"
        label-cols-sm="3"
        label="Number of results:"
        label-for="number"
      >
        <b-form-select
          id="number"
          v-model="form.number"
          :options="numbers"
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-diet"
        label-cols-sm="3"
        label="Diet:"
        label-for="diet"
      >
        <b-form-select
          id="diet"
          v-model="form.diet"
          :options="dietOptions"
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-cuisine"
        label-cols-sm="3"
        label="Cuisine:"
        label-for="cuisine"
      >
        <multiselect
          label-cols-sm="3"
          v-model="cuisine"
          :options="cuisineOptions"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="true"
          placeholder="Choose cuisines"
          label="name"
          track-by="name"
        >
          <template slot="selection" slot-scope="{ values, isOpen }"
            ><span
              class="multiselect__single"
              v-if="values.length &amp;&amp; !isOpen"
              >{{ values.length }} options selected</span
            ></template
          >
        </multiselect>
      </b-form-group>

      <b-form-group
        id="input-group-intolerances"
        label-cols-sm="3"
        label="Intolerances:"
        label-for="intolerances"
      >
        <multiselect
          label-cols-sm="3"
          v-model="intolerances"
          :options="intolerancesOptions"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="true"
          placeholder="Choose intolerances"
          label="name"
          track-by="name"
        >
          <template slot="selection" slot-scope="{ values, isOpen }"
            ><span
              class="multiselect__single"
              v-if="values.length &amp;&amp; !isOpen"
              >{{ values.length }} options selected</span
            ></template
          >
        </multiselect>
      </b-form-group>

      <b-button
        type="submit"
        variant="light"
        style="width:250px;"
        class="btn btn-outline-dark"
        >Search</b-button
      >
    </b-form>
    <br />
    <div v-if="this.recipes.length">
      <b-dropdown
        text="Sort By"
        variant="light"
        style="width:250px;"
        class="btn btn-outline-dark"
      >
        <b-dropdown-item href="#" v-on:click="sortTime()"
          >Time to cook</b-dropdown-item
        >
        <b-dropdown-item href="#" v-on:click="sortPopularity()"
          >Popularity</b-dropdown-item
        >
      </b-dropdown>
      <br />
      <RecipePreviewList
        title="Results"
        :recipesTemp="recipes"
        :class="{
          center: true,
        }"
        disabled
      ></RecipePreviewList>
    </div>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Search failed: {{ form.submitError }}
    </b-alert>
    <b-alert
      v-if="!this.recipes.length && this.searched"
      class="mt-2"
      variant="warning"
      dismissible
      show
    >
      No recipes found
    </b-alert>
  </div>
</template>

<script>
import {
  required,
} from "vuelidate/lib/validators";
import RecipePreviewList from "../components/RecipePreviewList";
import Multiselect from "vue-multiselect";
import { helpers } from 'vuelidate/lib/validators'
const alpha_spaces = helpers.regex('alpha_spaces', /^[a-zA-Z ]*$/)
export default {
  name: "search",
  components: {
    RecipePreviewList,
    Multiselect,
  },

  data() {
    return {
      form: {
        query: "",
        number: "5",
        diet: "",
        submitError: undefined,
      },
      searched: false,
      numbers: [5, 10, 15],
      dietOptions: [
        "",
        "Gluten Free",
        "Ketogenic",
        "Vegetarian",
        "Lacto-Vegetarian",
        "Ovo-Vegetarian",
        "Vegan",
        "Pescetarian",
        "Paleo",
        "Primal",
        "Whole30",
      ],
      // cuisineOptions:[{text:'African',value: 1}, {text:'American',value: 2}],
      // cuisineOptions:["","African", "American","British", "Cajun", "Caribbean","Chinese","Eastern European","European","French"],
      errors: [],
      validated: false,
      recipes: [],
      cuisine: [],
      cuisineOptions: [
        { name: "African" },
        { name: "American" },
        { name: "British" },
        { name: "Cajun" },
        { name: "Caribbean" },
        { name: "Chinese" },
        { name: "Eastern European" },
        { name: "European" },
        { name: "French" },
        { name: "German" },
        { name: "Greenk" },
        { name: "Indian" },
        { name: "Irish" },
        { name: "Italian" },
        { name: "Japanese" },
        { name: "Jewish" },
        { name: "Korean" },
        { name: "Latin American" },
        { name: "Mediterranean" },
        { name: "Mexican" },
        { name: "Middle Eastern" },
        { name: "Nordic" },
        { name: "Southern" },
        { name: "Spanish" },
        { name: "Thai" },
        { name: "Vietnamese" },
      ],
      intolerances: [],
      intolerancesOptions: [
        { name: "Dairy" },
        { name: "Egg" },
        { name: "Gluten" },
        { name: "Grain" },
        { name: "Peanut" },
        { name: "Seafood" },
        { name: "Sesame" },
        { name: "Shellfish" },
        { name: "Soy" },
        { name: "Sulfite" },
        { name: "Tree Nut" },
        { name: "Wheat" },
      ],
    };
  },
  validations: {
    form: {
      query: {
        required,
        alpha_spaces,
      },
    },
  },
  mounted() {
    this.initLastSearch();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => vm.initLastSearch());
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Search() {
      console.log("roiprprprppri");
      try {
        const response = await this.axios.post(
          this.$root.store.BASE_URL + "/recipes/search",
          {
            query: this.form.query,
            number: this.form.number,
            diet: this.form.diet,
            cuisine: this.cuisine.map((x) => x.name),
            intolerances: this.intolerances.map((x) => x.name),
          }
        );
        console.log(30, response);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        if (this.$root.store.username !== "") {
          this.$root.store.addLastSearch({
            form: this.form,
            cuisine: this.cuisine,
            intolerances: this.intolerances,
            recipes: this.recipes
          });
        }
        this.searched = true;

        console.log("noy" + response.data);
      } catch (err) {
        console.log("roi" + err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onSearch() {
      this.searched = false;
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Search();
    },
    sortTime() {
      this.recipes.sort(
        (a, b) => a.timeToCookInMinutes - b.timeToCookInMinutes
      );
    },
    sortPopularity() {
      this.recipes.sort((a, b) => b.likes - a.likes);
    },
    initLastSearch() {
      if (this.$root.store.username !== "" && this.$root.store.lastSearch) {
        this.form = this.$root.store.lastSearch.form;
        this.cuisine = this.$root.store.lastSearch.cuisine;
        this.intolerances = this.$root.store.lastSearch.intolerances;
        this.recipes = this.$root.store.lastSearch.recipes;
      }
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
