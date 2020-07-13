<template>
  <div>
    <p class="h1 mb-2">
      <b-icon-eye-fill
        v-if="recipe.watched == true"
        style=" position: absolute; top: 270px; left: 20;"
      ></b-icon-eye-fill>
    </p>
    <div
      @click="addTofavorite"
      v-if="$root.store.username && recipe.favorite == false"
      class="circle"
      style=" position: absolute; top: 50px; left: -10px;  "
    >
      <p class="h1 mb-2">
        <b-icon-heart-fill
          style="color:white; position: absolute; top: 12px; left: 8;"
        ></b-icon-heart-fill>
      </p>
    </div>
    <p class="h1 mb-2">
      <b-icon-heart-fill
        class="favorite"
        variant="danger"
        v-if="$root.store.username && recipe.favorite == true"
        style=" position: absolute; top: 60px; left: 0px;  "
      ></b-icon-heart-fill>
    </p>
  </div>
</template>

<script>
export default {
  name: "RecipePreviewExtension",
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async addTofavorite() {
      let responseAfterAddFavorite;
      this.cur_recipe.favorite = true;
      //favorite / watched
      try {
        responseAfterAddFavorite = await this.axios.put(
          "http://localhost:4000/profile/favorite/add/" +
            this.cur_recipe.recipe_id
        );

        if (responseAfterAddFavorite.status !== 200)
          this.$router.replace("/NotFound");
      } catch (error) {
        this.$router.replace("/NotFound");
        return;
      }
      let _recipe = {
        instructions: this.cur_recipe.instructions,
        _instructions: this.cur_recipe._instructions,
        // analyzedInstructions,
        ingredients: this.cur_recipe.ingredients,
        vegetarian: this.cur_recipe.vegetarian,
        vegan: this.cur_recipe.vegan,
        glutenFree: this.cur_recipe.glutenFree,
        aggregateLikes: this.cur_recipe.aggregateLikes,
        readyInMinutes: this.cur_recipe.readyInMinutes,
        image: this.cur_recipe.image,
        title: this.cur_recipe.title,
        servings: this.cur_recipe.servings,
        favorite: true,
      };
      this.cur_recipe = _recipe;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans:100,300,400,600,700|Work+Sans:100,200,300,400,500,600");

.circle:hover {
  background-color: rgb(0, 0, 0, 0.7);
  border: 1px solid rgb(0, 0, 0, 0.7);
}
.circle {
  background-color: rgb(120, 120, 120, 0.7);
  border: 1px solid rgb(120, 120, 120, 0.7);
  height: 60px;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  width: 60px;
}
</style>
