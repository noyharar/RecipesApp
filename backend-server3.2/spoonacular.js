const axios = require("axios");
const apiKey = process.env.spooncular_apiKey;
const api_domain = "https://api.spoonacular.com/recipes";
var counter = 0;
// query,number,cuisine,diet,intolerances
function searchRecipes(searchParameters) {
        // let searchRecipesPath = api_domain + '/search' + '?apiKey=' + apiKey;
        // if(searchParameters.query){
        //     searchRecipesPath = searchRecipesPath + '&query=' + searchParameters.query;
        // }
        // if(searchParameters.number){
        //     searchRecipesPath = searchRecipesPath + '&number=' + searchParameters.number;
        // }
        // else{
        //     searchRecipesPath = searchRecipesPath + '&number=5';
        // }
        // if(searchParameters.cuisine){
        //     searchRecipesPath = searchRecipesPath + '&cuisine=' + searchParameters.cuisine.join(',');
        // }
        // if(searchParameters.diet){
        //     searchRecipesPath = searchRecipesPath + '&diet=' + searchParameters.diet;
        // }
        // if(searchParameters.intolerances){
        //     searchRecipesPath = searchRecipesPath + '&intolerances=' + searchParameters.intolerances.join(',');
        // }
    let config = {
        params: {
            apiKey: apiKey,
            query: searchParameters.query ? searchParameters.query : null,
            number: searchParameters.number ? searchParameters.number : 5,
            diet: searchParameters.diet ? searchParameters.diet : null,
            cuisine: searchParameters.cuisine ? searchParameters.cuisine.join(',') : null,
            intolerances: searchParameters.intolerances ? searchParameters.intolerances.join(',') : null,
            instructionsRequired: true
        }
    };
    // counter++;
    // console.log(counter);
    return axios.get(`${api_domain}/search`, config);
}

function getRecipe(id) {
    let config = {
        params: {
            includeNutrition: false,
            apiKey: apiKey
        }
    };
    // counter++;
    // console.log(counter);
    return axios.get(`${api_domain}/${id}/information`, config);

    // return new Promise((resolve, reject) => {
    //     let getRecipePath = 'https://api.spoonacular.com/recipes/' + id + '/information?apiKey=' + apiKey;
    //     https.get(getRecipePath, (resp) => {
    //         let recipe_info = '';
    //         // A chunk of data has been received.
    //         resp.on('data', (chunk) => {
    //             recipe_info += chunk;
    //         });
    //
    //         // The whole response has been received. Print out the result.
    //         resp.on('end', () => {
    //             resolve(JSON.parse(recipe_info));
    //         });
    //
    //     }).on("error", (err) => {
    //         reject(err);
    //     });
    // });
}

function getRandomRecipes(number){
    // let randomRecipesPath = `${api_domain}/random?apiKey=${apiKey}&number=3`;
    let config = {
        params: {
            number: number,
            apiKey: apiKey
        }
    };
    // counter++;
    // console.log(counter);
    return axios.get(`${api_domain}/random`, config);
}


module.exports.searchRecipes = searchRecipes;
module.exports.getRecipe = getRecipe;
module.exports.getRandomRecipes = getRandomRecipes;

