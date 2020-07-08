<template>
  <div class="container">
    <div v-if="familyRecipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ familyRecipe.title }}</h1>
        <img :src="familyRecipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ familyRecipe.readyInMinutes }} minutes</div>
              <div>Vegan: {{ familyRecipe.vegan }}</div>
              <div>Vegetarian: {{ familyRecipe.vegetarian }}</div>
              <div>GlutenFree: {{ familyRecipe.glutenFree }}</div>
              <div>This recipe made by: {{ familyRecipe.owner }}</div>
              <div>Where: {{ familyRecipe.where }}</div>
            </div>
            Ingredients:
            <ul>
              <li
                v-for="r in familyRecipe.ingredients"
                :key="'_' + r.amount + r.name"
              >
                {{ r.amount + " " + r.name }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in familyRecipe.instructions" :key="s.number">
                {{ s.content }}
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
      familyRecipe: null,
    };
  },

  async created() {
    console.log("created",1111111)
    try {
      let response;

      try {
        console.log(this.$route.params.recipeId);
        if(this.$route.params.type=="family"){
        response = await this.axios.get(
          this.$root.store.BASE_URL +
            "/profile/familyRecipes/" +
            "[" +
            this.$route.params.recipeId +
            "]"
        );
        }

        else{
          if(this.$route.params.type=="my"){
                    response = await this.axios.get(
          this.$root.store.BASE_URL +
            "/profile/myRecipes/" +
            "[" +
            this.$route.params.recipeId +
            "]"
        );
          }
        }
        console.log("after");
        console.log(response);

        let _familyRecipe = {
          instructions: response.data[0].instructions,
          ingredients: response.data[0].ingredients,
          vegetarian: response.data[0].vegetarian,
          vegan: response.data[0].vegan,
          glutenFree: response.data[0].glutenFree,
          readyInMinutes: response.data[0].readyInMinutes,
          image:
            "https://res.cloudinary.com/dc9fdssoo/image/upload/" +
            response.data[0].image,
          title: response.data[0].title,
          owner: response.data[0].owner,
          where: response.data[0].where,
        };

        this.familyRecipe = _familyRecipe;

        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
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
