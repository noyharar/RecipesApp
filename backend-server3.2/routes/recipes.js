
var express = require("express");
var router = express.Router();
// const DButils = require("../../modules/DButils");
// const bcrypt = require("bcrypt");
const { searchRecipes, getRecipe, getRandomRecipes } = require("../spoonacular");


// router.get('/:id', async function (req, res,next) {
//     console.log("get recipe");
//     try {
//         let ids = [];
//         let recipeId = req.params.id;
//         // if(recipes.length === 0){
//         //     throw { status: 401, message: "Recipes not found" };
//         // }
//         ids.push(recipeId);
//         let recipesInfo = await getRecipesInfo(ids);
//         res.send(recipesInfo[0]);
//     } catch (e) {
//         next(e);
//     }
// });



router.post('/search', async function (req, res,next) {
    console.log("Search recipes");
    try {
        let searchParam = req.body;
        let result = await searchRecipes(searchParam || {});
        let ids = [];
        let recipes = result.data.results;
        if(recipes.length === 0){
            res.send([]);
            return;
        }
        for(var i = 0; i < recipes.length; i++ ) {
            ids.push(recipes[i].id);
        }
        let recipesInfo = await getRecipesInfo(ids);
        res.send(recipesInfo);
    } catch (e) {
        next(e);
    }

});

router.get('/random', async function (req, res, next) {
    console.log("Random recipes");
    try {
        let ids = [];
        while(ids.length < 3) {
            let result = await getRandomRecipes(5);
            let recipes = result.data.recipes;
            var i = 0;
            while (i < recipes.length) {
                let id = recipes[i].id;
                if ((recipes[i].instructions !== '' || recipes[i].instructions !== null) && !ids.includes(id)) {
                    ids.push(id);
                }
                if (ids.length === 3) {
                    break;
                }
                i++;
            }
        }
        let recipesInfo = await getRecipesInfo(ids);
        res.send(recipesInfo);
    } catch (e) {
        next(e)
    }
});

async function getRecipesInfo(recipes) {
    const promises = [];
    for (var i = 0; i < recipes.length; i++) {
        promises.push(getRecipe(recipes[i]));
    }
    let recipes_info = await Promise.all(promises);
    return recipes_info.map((recipe_info) => {
                const {
                    id,
                    title,
                    readyInMinutes,
                    aggregateLikes,
                    vegetarian,
                    vegan,
                    glutenFree,
                    image,
                    instructions,
                    servings,
                    extendedIngredients,
                } = recipe_info.data;

                return {
                    id: id,
                    name: title,
                    timeToCookInMinutes: readyInMinutes,
                    likes: aggregateLikes,
                    vegetarian: vegetarian,
                    vegan: vegan,
                    gluten: glutenFree,
                    pictureUrl: image,
                    instructions: instructions,
                    numOfMeals: servings,
                    ingredients: extendedIngredients.map((ingredient) => {
                        const {
                            name,
                            amount,
                            unit,
                        } = ingredient;
                        return {
                            name: name,
                            amount: amount,
                            unit: unit,
                        }
                    }),
                };
            });
}





module.exports = router;
module.exports.getRecipesInfo = getRecipesInfo;
