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
              <div>Num Of Servings : {{ recipe.servings }}</div>
              <div>Vegan: {{ recipe.vegan }}</div>
              <div>Vegetarian: {{ recipe.vegetarian }}</div>
              <div>Gluten Free: {{ recipe.glutenFree }}</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
              <div>
                <!-- <div class="favorite" > -->
                <div v-if="$root.store.username">
                  
                  Favorite: {{ recipe.favorite }}
                </div>
                <div v-if="$root.store.username">
                  Watched: {{ recipe.watched }}
                </div>
              </div>
            </div>
            Ingredients:
            <ul>
              <li
                v-for="r in recipe.ingredients"
                :key="'_' + r.amount + r.name"
              >
                {{ r.amount + " " + r.name }}
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

      try {
        console.log("recipe id: " + this.$route.params.recipeId);
        response = await this.axios.get(
          "http://localhost:4000/recipes/displayRecipePage/recipeId/" +
            this.$route.params.recipeId
        );
        console.log("success addd!!!!!!!!!!!");
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
      let _instructions = a.instructions;
      //do login
      if (this.$root.store.username) {
        await this.checkIfLogin(_instructions, response);
      } else {
        let _recipe = {
          instructions: response.data.instructions,
          _instructions,
          // analyzedInstructions,
          ingredients: response.data.ingredients,
          vegetarian: response.data.vegetarian,
          vegan: response.data.vegan,
          glutenFree: response.data.glutenFree,
          aggregateLikes: response.data.aggregateLikes,
          readyInMinutes: response.data.readyInMinutes,
          image: response.data.image,
          title: response.data.title,
          servings: response.data.servings,
        };
        this.recipe = _recipe;
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async checkIfLogin(_instructions, response) {
      try {
        let responewatchedorfav;

        //favorite / watched
        try {
          // console.log(this.$route.params.recipeId);
          console.log("enter to watch/fav");
          responewatchedorfav = await this.axios.get(
            "http://localhost:4000/profile/recipeInfo/" +
              "[" +
              this.$route.params.recipeId +
              "]"
          );
          console.log("after");
          console.log(responewatchedorfav);
          // console.log("response.status", response.status);
          if (responewatchedorfav.status !== 200)
            this.$router.replace("/NotFound");
        } catch (error) {
          console.log(
            "error.respone_watchedOrFav.status",
            error.responewatchedorfav.status
          );
          this.$router.replace("/NotFound");
          return;
        }

        let _recipe = {
          instructions: response.data.instructions,
          _instructions,
          // analyzedInstructions,
          ingredients: response.data.ingredients,
          vegetarian: response.data.vegetarian,
          vegan: response.data.vegan,
          glutenFree: response.data.glutenFree,
          aggregateLikes: response.data.aggregateLikes,
          readyInMinutes: response.data.readyInMinutes,
          image: response.data.image,
          title: response.data.title,
          servings: response.data.servings,
          favorite:
            responewatchedorfav.data[this.$route.params.recipeId].favorite,
          watched:
            responewatchedorfav.data[this.$route.params.recipeId].watched,
        };

        this.recipe = _recipe;
      } catch (error) {
        console.log(error);
      }
    },
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

.favorite,
.watched {
  display: none;
}
/* .recipe-header{

} */
</style>
