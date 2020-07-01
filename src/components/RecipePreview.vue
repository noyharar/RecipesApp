<template>
    <b-card
                no-body
                style="align-self:flex-start;  display: flex;
                align-items:flex-start;
                width: 100%;
                height: border-box;
                justify-content:space-between;
                flex-wrap:wrap;"
                border-variant="danger"
                class="overflow-hidden"
                bg-variant="light"

        >
        <router-link
                :to="{ name: 'recipe', params: {
      recipeId: recipe.id,
      recipeName: recipe.name,
      pictureUrl: recipe.pictureUrl,
      timeToCookInMinutes: recipe.timeToCookInMinutes,
      likes: recipe.likes,
      vegan: recipe.vegan,
      gluten: recipe.gluten,
      vegetarian: recipe.vegetarian,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      numOfMeals: recipe.numOfMeals,
    userRecipe: userRecipe} }"
                class="recipe-preview"
        >

<!--            <mdb-view class="zoom" :src="recipe.pictureUrl" alt="">-->
<!--                <mdb-mask flex-center Learn more />-->
<!--            </mdb-view>-->

            <b-card-img :src="recipe.pictureUrl" alt="Image" class="zoom" top></b-card-img>

        </router-link>
<!--            <b-row no-gutters>-->
<!--                <b-card-img :src="recipe.pictureUrl" alt="Image" class="recipe-image" top></b-card-img>-->
                <b-card-body :title="recipe.name">
                    <div v-if="!userRecipe">
                        <b-icon v-if="seen(recipe) === true && this.$root.store.username" icon="eye-fill"></b-icon>&#160;&#160;&#160;
                        <b-icon v-if="favorite(recipe) === true && this.$root.store.username" icon="heart-fill" ></b-icon>
                    <b-icon v-b-tooltip.hover title="Add recipe to your favorites" v-if="favorite(recipe) === false && this.$root.store.username" v-on:click=addFavoriteRecipe() type="button" icon="heart">
                    </b-icon>
<!--                        <b-icon v-if="favorite(recipe) === false && this.$root.store.username" v-on:click=addFavoriteRecipe() type="button" icon="heart"></b-icon>-->
                        &#160;&#160;&#160;&#160;
                    <b-icon icon="hand-thumbs-up"></b-icon>
                        {{ recipe.likes }}
                    </div>
                    <b-card-text>
                        <b-icon icon="clock"></b-icon>
                        {{ recipe.timeToCookInMinutes }} minutes
                        <br>
                        <ul style="list-style-type: none; margin: 0; padding: 0">
                            <li style="animation:ease-in">
                                Vegan:
<!--                                <img v-if="recipe.vegan" :src="'https://res.cloudinary.com/dfboebsri/image/upload/v1593098818/vegan_icon_k8coge.png'" style="width: -10%"/>-->
                                <b-icon v-if="recipe.vegan === true" icon="check-circle"></b-icon>
                                <b-icon v-if="recipe.vegan === false" icon="x-circle"></b-icon>
                            </li>
                            <li>
                                Vegetarian:
<!--                                                        <img v-if="recipe.vegetarian" :src="'https://res.cloudinary.com/dfboebsri/image/upload/v1593098485/vegi_iokloj.png'"/>-->

                                <b-icon v-if="recipe.vegetarian" icon="check-circle"></b-icon>
                                <b-icon v-if="recipe.vegetarian === false" icon="x-circle"></b-icon>

                        </li>
                        <li>
                            Gluten Free:
                            <b-icon v-if="recipe.gluten === true " icon="check-circle"></b-icon>
                            <b-icon v-if="recipe.gluten === false" icon="x-circle"></b-icon>
                        </li>
                        </ul>

<!--                        <img v-if="recipe.vegan" :src="'https://res.cloudinary.com/dfboebsri/image/upload/v1593098818/vegan_icon_k8coge.png'"/>-->
<!--                        <img v-if="recipe.vegetarian" :src="'https://res.cloudinary.com/dfboebsri/image/upload/v1593098485/vegi_iokloj.png'"/>-->
<!--                        <img v-if="recipe.gluten" :src="'https://img.icons8.com/plasticine/100/000000/no-gluten.png'" width=15%/>-->

                    </b-card-text>
                </b-card-body>
                <!--              </b-col>-->
<!--            </b-row>-->
        </b-card>
</template>
<!--    <div class="recipe-body">-->
<!--      <img :src="recipe.pictureUrl" class="recipe-image"/>-->
<!--    </div>-->
<!--  </router-link>-->
<!--  <div class="recipe-footer">-->
<!--      <div :title="recipe.name" class="recipe-title">-->
<!--        {{ recipe.name }}-->
<!--      </div>-->
<!--      <ul class="recipe-overview">-->
<!--        <li>{{ recipe.timeToCookInMinutes }} minutes</li>-->
<!--        <li>{{ recipe.likes }} likes</li>-->
<!--      </ul>-->
<!--      <footer>-->
<!--          <img v-if="favorite(recipe) === true && this.$root.store.username" :src="'https://img.icons8.com/cotton/64/000000/like&#45;&#45;v3.png'"  />-->
<!--          <img v-if="favorite(recipe) === false && this.$root.store.username" v-on:click=addFavoriteRecipe() :src="'https://img.icons8.com/cotton/64/000000/plus&#45;&#45;v2.png'"  />-->
<!--          <img v-if="recipe.vegan" :src="'https://img.icons8.com/color/48/000000/vegan-symbol.png'" />-->
<!--          <img v-if="recipe.vegetarian" :src="'https://img.icons8.com/color/48/000000/vegetarian-mark.png'"  />-->
<!--          <img v-if="seen(recipe) === true" :src="'https://img.icons8.com/dusk/64/000000/check-all.png'"  />-->
<!--  </footer>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<script>
    import MainPage from "../pages/MainPage";

    export default {
        name: "recipePreview",

        data() {
            return {};
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
                    if (!this.$root.store.username) {
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
            userRecipe:{
                type: Boolean,
                required: false
            }
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
    .zoom {
        padding: 0px;
        /*background-color: green;*/
        transition: transform .2s; /* Animation */
        width: 95%;
        /*height: 200px;*/
        margin: 0 auto;
    }

    .zoom:hover {
        transform: scale(1.25); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
    }
    .recipe-preview {
        display: inline-block;
        width: 100%;
        height: 100%;
        position: relative;
        margin: 10px 10px;
    }

    .recipe-preview > .recipe-body {
        width: 100%;
        height: 300px;
        position: relative;
    }

    .recipe-preview .recipe-body .recipe-image {
        margin-left: auto;
        margin-right: auto;
        margin-top: auto;
        margin-bottom: auto;
        display: block;
        width: 50%;
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

    /*.recipe-preview. overflow-hidden*/
</style>
