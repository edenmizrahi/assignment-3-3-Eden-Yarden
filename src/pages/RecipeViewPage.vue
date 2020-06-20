<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
        console.log(this.$route.params.recipeId);
        response = await this.axios.get(
          "https://assignment3-2-yarden.herokuapp.com/recipes/displayRecipePage/recipeId/:id",
          {
            params: { id: this.$route.params.recipeId },
          }
        );
        // console.log("after");
        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      console.log(response);
      let a = {
        // analyzedInstructions,
        id: response.data.id,
        image: response.data.image,
        title: response.data.title,
        readyInMinutes: response.data.readyInMinutes,
        aggregateLikes: response.data.aggregateLikes,
        vegetarian: response.data.vegetarian,
        vegan: response.data.vegan,
        glutenFree: response.data.glutenFree,
        ingredients: response.data.ingredients,
        instructions: response.data.instructions,
        servings: response.data.servings,
      };
      console.log(a);
      console.log(a.instructions);
      let _instructions = a.instructions
        .map((fstep) => {
          fstep = fstep.number + " " + fstep.step;
          return fstep;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        instructions: response.data.instructions,
        _instructions,
        // analyzedInstructions,
        ingredients: response.data.ingredients,
        aggregateLikes: response.data.aggregateLikes,
        readyInMinutes: response.data.readyInMinutes,
        image: response.data.image,
        title: response.data.title,
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
/* .recipe-header{

} */
</style>
