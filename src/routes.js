import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    meta: {
      requiresAuth: true,
    },
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
  },
  {
    path: "/family/:recipeId",
    name: "familyRecipe",
    component: () => import("./pages/FamilyViewPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
