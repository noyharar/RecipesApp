import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
    {
        path: "/",
        name: "main",
        component: Main,
    },
    {
        path: "/register",
        name: "register",
        component: () => import("./pages/RegisterPage"),
    },
    // {
    //   path: "/tesr",
    //   name: "tesr",
    //   component: () => import("./pages/tesr"),
    // },
    {
        path: "/login",
        name: "login",
        component: () => import("./pages/LoginPage"),
    },
    {
        path: "/search",
        name: "search",
        component: () => import("./pages/SearchPage"),
    },
    {
        path: "/myRecipes",
        name: "myRecipes",
        meta: { requiresAuth: true },
        component: () => import("./pages/UserRecipesPage"),
    },
    {
        path: "/favoritesRecipes",
        name: "favoritesRecipes",
        meta: { requiresAuth: true },
        component: () => import("./pages/FavoritesRecipesPage"),
    },
    {
        path: "/familyRecipes",
        name: "familyRecipes",
        meta: { requiresAuth: true },
        component: () => import("./pages/FamilyRecipesPage"),
    },
    {
        path: "/about",
        name: "about",
        component: () => import("./pages/AboutPage")
    },
    {
        path: "/recipe/:recipeId",
        name: "recipe",
        component: () => import("./pages/RecipeViewPage"),
    },
    {
        path: "/profile",
        name: "user",
        component: () => import("./pages/UserProfilePage"),
    },
    {
        path: "*",
        name: "notFound",
        component: NotFound,
    },
];

export default routes;
