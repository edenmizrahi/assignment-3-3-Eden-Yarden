<template>
  <div>
    <p class="h1 mb-2">
      <b-icon-eye-fill
        v-if="recipe.watched == true"
        style=" position: absolute; top: 270px; left: 20;"
      ></b-icon-eye-fill>
    </p>
    <!-- <button
      class="circle"
      v-if="$root.store.username && recipe.favorite == false"
      type="button"
      style=" position: absolute; top: 50px; left: -10px;  font-size:40px;  "
      @click="addTofavorite()"
    >
      <b-icon-heart-fill
        style="color:white; position: absolute; top: 12px; left: 8;"
      ></b-icon-heart-fill>
    </button> -->
    <div
      @click="addTofavorite()"
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
      //   console.log(this.recipe);
      this.recipe.favorite = true;
      let id = this.recipe.recipe_id;
      //favorite / watched
      try {
        responseAfterAddFavorite = await this.axios.put(
          "http://localhost:4000/profile/favorite/add/" + this.recipe.recipe_id
        );
        console.log(responseAfterAddFavorite);
        console.log(this.recipe.recipe_id);
        if (responseAfterAddFavorite.status !== 200)
          this.$router.replace("/NotFound");
      } catch (error) {
        this.$router.replace("/NotFound");
        return;
      }
      let _recipe = {
        // id: this.recipe.recipe_id,
        instructions: this.recipe.instructions,
        _instructions: this.recipe._instructions,
        // analyzedInstructions,
        ingredients: this.recipe.ingredients,
        vegetarian: this.recipe.vegetarian,
        vegan: this.recipe.vegan,
        glutenFree: this.recipe.glutenFree,
        aggregateLikes: this.recipe.aggregateLikes,
        readyInMinutes: this.recipe.readyInMinutes,
        image: this.recipe.image,
        title: this.recipe.title,
        servings: this.recipe.servings,
        favorite: true,
      };
      console.log("a");
      this.recipe = _recipe;
      console.log("aa");
      //update recipes array in local storage
      if (localStorage.search) {
        let recipesFromLocalStorage = JSON.parse(localStorage.search);
        let find = "false";
        for (
          let k = 0;
          k < recipesFromLocalStorage.length && find == "false";
          k++
        ) {
          if (recipesFromLocalStorage[k].recipe_id == id) {
            recipesFromLocalStorage[k].favorite = true;
            find = "true";
          }
        }

        if (find == "true") {
          console.log("b");
          localStorage.removeItem("search");
          localStorage.setItem(
            "search",
            JSON.stringify(recipesFromLocalStorage)
          );
          console.log("c");
        }
      }
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
