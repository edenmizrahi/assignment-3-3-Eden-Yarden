<template>
  <div>
    <RecipePreviewList title="Some Of Our Recipes" :recipes="recipes">
    </RecipePreviewList>
    <br />
    <br />
    <br />
    <RandomRecipesAction
      v-on:random-click-event="updateRecipes"
    ></RandomRecipesAction>
  </div>
</template>

<script>
import RecipePreviewList from "./RecipePreviewList.vue";
import RandomRecipesAction from "./RandomRecipesAction.vue";
export default {
  components: {
    RecipePreviewList,
    RandomRecipesAction,
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.BASE_URL + "/recipes/random"
        );

        const recipes_ = response.data;
        console.log(response);
        console.log(recipes_);
        this.recipes.push;
        this.recipes = [];

        this.recipes.push(...recipes_);
        console.log("start check22222222***********************");

        console.log(recipes_);
        console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
