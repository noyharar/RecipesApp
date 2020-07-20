var express = require("express");
var router = express.Router();
//var path = require("path");
//var logger = require("morgan");
const session = require("client-sessions");
const DButils = require("../DButils");
const { getRecipesInfo } = require("./recipes");

router.use(function requiresAuth(req, res, next) {
  if (req.session && req.session.id) {
    DButils.execQuery("SELECT user_id FROM users")
      .then((users) => {
        if (users.find((x) => x.user_id === req.session.id)) {
          req.id = req.session.id;
          next();
        } else next({ status: 401, message: "unauthorized" });
      })
      .catch((error) => next({ status: 401, message: "unauthorized" }));
  } else {
    next({ status: 401, message: "unauthorized" });
  }
});

router.get("/", async (req, res, next) => {
  console.log("get user details");
  try {
    const user = await DButils.execQuery(
      "SELECT * FROM users where user_id " + "='" + req.session.id + "'"
    );
    let details = user[0];
    res.send({
      username: details.user_name,
      firstName: details.firstName,
      lastName: details.lastName,
      country: details.country,
      email: details.email,
      profilePicture: details.profilePicture,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/favorites", async (req, res, next) => {
  try {
    let preview = req.query.preview === "true";
    console.log("Favorites recipes");
    const favorites = await DButils.execQuery(
      "SELECT recipe_id FROM favorites where user_id " +
        "='" +
        req.session.id +
        "'"
    );
    if (favorites.length === 0) {
      res.send([]);
      return;
    }
    let ids = [];
    for (var i = 0; i < favorites.length; i++) {
      ids.push(favorites[i].recipe_id);
    }
    if(preview) {
      let recipesInfo = await getRecipesInfo(ids);
      res.send(recipesInfo);
      return;
    }
    res.send(ids.map(id => {
      return {
        id: parseInt(id)
      }
    }));
  } catch (error) {
    next(error);
  }
});

router.post("/favorites", async (req, res, next) => {
  try {
    console.log("add to Favorites recipes");
    // const favorites = await DButils.execQuery('insert into favorites  where user_id '+'=\'' + req.session.id + '\'');
      const favoriteRecipe = await DButils.execQuery(
        `SELECT * FROM dbo.favorites where user_id = \'${req.session.id}\' and recipe_id = \'${req.body.id}\'`
      );

      //let test = req.body.username;
      if (favoriteRecipe.length > 0) {
        throw { status: 400, message: "The recipe already in your favorites" };
      }
      let query = `insert into favorites (user_id, recipe_id) values (\'${req.session.id}\', ${req.body.id})`;
      await DButils.execQuery(query);
      res.send({
        message: "favorite recipe added successfully",
        success: true,
      });
    
  } catch (error) {
    next(error);
  }
});
router.get("/family-recipes", async (req, res, next) => {
  try {
    console.log("User family recipes");
      const userFamilyRecipes = await DButils.execQuery(
        "SELECT * FROM familyRecipes where author " +
          "='" +
          req.session.id +
          "'"
      );
      if (userFamilyRecipes.length === 0) {
        res.send([]);
        return;
      }
      res.send(transformFamilyRecipesFromDatabase(userFamilyRecipes));
  } catch (error) {
    next(error);
  }
});
router.get("/recipes", async (req, res, next) => {
  try {
    console.log("User recipes");
      const userRecipes = await DButils.execQuery(
        "SELECT * FROM recipes where author " + "='" + req.session.id + "'"
      );
      if (userRecipes.length === 0) {
        res.send([]);
        return;
      }
      res.send(transformRecipesFromDatabase(userRecipes));
  } catch (error) {
    next(error);
  }
});

router.post("/watch", async (req, res, next) => {
  try {
    console.log("add to watched recipe");
    // const favorites = await DButils.execQuery('insert into favorites  where user_id '+'=\'' + req.session.id + '\'');
      const watchedRecipe = await DButils.execQuery(
        `SELECT * FROM dbo.watched where user_id = \'${req.session.id}\' and recipe_id = \'${req.body.id}\'`
      );
      var now = new Date();
      //let test = req.body.username;
      if (watchedRecipe.length > 0) {
        let query = `update  watched set watched_date =${now.getTime()} where user_id ='${
          req.session.id
        }' and recipe_id = '${req.body.id}'`;
        await DButils.execQuery(query);
        res.send({ message: "watched recipe", success: true });
        // throw {status: 400, message: "The recipe already in your watched recipes"};
        return;
      }
      let query = `insert into watched (user_id, recipe_id,watched_date) values (\'${
        req.session.id
      }\', ${req.body.id}, ${now.getTime()})`;
      await DButils.execQuery(query);
      res.send({ message: "watched recipe", success: true });
    
  } catch (error) {
    next(error);
  }
});

router.get("/watch", async (req, res, next) => {
  try {
      let preview = req.query.preview === "true";
      console.log("get watched recipes");
      const watchedRecipes = await DButils.execQuery(
        "SELECT * FROM watched where user_id " + "='" + req.session.id + "'"
      );
      if (watchedRecipes.length === 0) {
        res.send([]);
        return;
      }
      watchedRecipes.sort((x, y) => (x.watched_date < y.watched_date ? 1 : -1));
      let length = preview ? 3 : watchedRecipes.length;
      let ids = [];
      for (var i = 0; i < Math.min(length, watchedRecipes.length); i++) {
        ids.push(watchedRecipes[i].recipe_id);
      }
      if(preview) {
        let recipesInfo = await getRecipesInfo(ids);
        res.send(recipesInfo);
        return;
      }
      res.send(ids.map(id => {
        return {
          id: parseInt(id)
        }
      }));
  } catch (error) {
    next(error);
  }
});

function transformRecipesFromDatabase(userRecipes) {
  return userRecipes.map((recipe_info) => {
    const {
      recipe_id,
      recipe_name,
      time_to_cook_in_minutes,
      likes,
      vegetarian,
      vegan,
      gluten,
      pictureUrl,
      instructions,
      ingredients,
      numOfMeals,
    } = recipe_info;

    return {
      id: recipe_id,
      name: recipe_name,
      timeToCookInMinutes: time_to_cook_in_minutes,
      likes: likes,
      vegetarian: vegetarian,
      vegan: vegan,
      gluten: gluten,
      pictureUrl: pictureUrl,
      instructions: instructions,
      ingredients: JSON.parse(ingredients),
      numOfMeals: numOfMeals,
    };
  });
}
function transformFamilyRecipesFromDatabase(userFamilyRecipes) {
  return userFamilyRecipes.map((recipe_info) => {
    const {
      recipe_id,
      recipe_name,
      time_to_cook_in_minutes,
      likes,
      vegetarian,
      vegan,
      gluten,
      pictureUrl,
      instructions,
      ingredients,
      numOfMeals,
      familyMember,
      cooking_Event_Time,
      picture_Member_Food,
    } = recipe_info;

    return {
      id: recipe_id,
      name: recipe_name,
      timeToCookInMinutes: time_to_cook_in_minutes,
      likes: likes,
      vegetarian: vegetarian,
      vegan: vegan,
      gluten: gluten,
      pictureUrl: pictureUrl,
      instructions: instructions,
      ingredients: JSON.parse(ingredients),
      numOfMeals: numOfMeals,
      familyMember: familyMember,
      cookingEventTime: cooking_Event_Time,
      pictureMemberFood: picture_Member_Food,
    };
  });
}
module.exports = router;
