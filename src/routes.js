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
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  // {
  //   path: "/profile/:recipeId",
  //   name: "recipe",
  //   component: () => import("./pages/RecipeViewPage"),
  // },
  {
    path: "/family",
    name: "family",
    component: () => import("./pages/FamilyPage"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/family/:recipeId",
    name: "familyRecipe",
    component: () => import("./pages/FamilyViewPage"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/recipes/:name",
    name: "recipesPage",
    component: () => import("./pages/RecipesPage"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
