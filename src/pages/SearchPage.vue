<template>
  <div class="container">
    <h1 class="title">Search</h1>
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
      <b-button
              type="submit"
              variant="primary"
              style="width:250px;"
              class="ml-5 w-75"
      >Search</b-button
      >
    </b-form>
    <RecipePreviewList
            title="results"
            :recipesTemp="recipes"
            :class="{
        center: true
      }"
            disabled
    ></RecipePreviewList>
    <b-alert
            class="mt-2"
            v-if="form.submitError"
            variant="warning"
            dismissible
            show
    >
      Search failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
  import {
    required,
    minLength,
    maxLength,
    alpha,
    sameAs,
    email
  } from "vuelidate/lib/validators";
  import RecipePreviewList from "../components/RecipePreviewList";

  export default {
    name: "search",
    components: {
      RecipePreviewList
    },
    data() {
      return {
        form: {
          query: "",
          submitError: undefined
        },
        errors: [],
        validated: false,
        recipes: []
      };
    },
    validations: {
      form: {
        query: {
          required,
          length: (u) => minLength(3)(u) && maxLength(8)(u),
          alpha
        },
      }
    },
    mounted() {
      // console.log("mounted");
      // console.log($v);
    },

    methods: {
      validateState(param) {
        const { $dirty, $error } = this.$v.form[param];
        return $dirty ? !$error : null;
      },
      async Search() {
        try {
          const response = await this.axios.post(
                  "https://ass3-noa-noy.herokuapp.com/recipes/search",
                  {
                    query: this.form.query,
                  }
          );
          const recipes = response.data;
          this.recipes = [];
          this.recipes.push(...recipes);
          // console.log(response);
        } catch (err) {
          console.log(err.response);
          this.form.submitError = err.response.data.message;
        }
      },
      onSearch() {
        // console.log("register method called");
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        // console.log("register method go");
        this.Search();
      }
    }
  };
</script>
<style lang="scss" scoped>
  .container {
    max-width: 500px;
  }
</style>
