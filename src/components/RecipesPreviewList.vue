<template>
  <div>
    <div v-if="type == 'random'">
      <b-container>
        <h3 class="title_left">
          Explore Our Recipes:
          <slot></slot>
        </h3>

        <b-row>
          <b-col v-for="r in this.recipes" :key="r.recipe_id">
            <RecipePreviewWrapper class="recipePreview" v-bind:recipe="r" />
          </b-col>
        </b-row>
      </b-container>

      <br />
      <br />
      <RandomRecipesAction
        v-on:random-click-event="updateRecipes"
      ></RandomRecipesAction>
    </div>
    <div v-if="type == 'lastWatch'">
      <b-container>
        <h3>
          Last Watched:
          <slot></slot>
        </h3>
        <b-col v-for="r in recipes" :key="r.id">
          <RecipePreviewWrapper class="recipePreview" :recipe="r" />
        </b-col>
      </b-container>
    </div>
    <!-- <div v-if="type == 'search'">
      <b-container>
        <h3>
          Search results:
          <slot></slot>
        </h3>
        <b-col v-for="r in recipes" :key="r.id">
          <RecipePreviewWrapper class="recipePreview" :recipe="r" />
        </b-col>
      </b-container>
    </div> -->
  </div>
</template>

<script>
import RandomRecipesAction from "./RandomRecipesAction.vue";
import RecipePreviewWrapper from "./RecipePreviewWrapper.vue";

export default {
  name: "RecipesPreviewList",
  components: {
    RecipePreviewWrapper,
    // RecipePreviewList,
    RandomRecipesAction,
  },

  data() {
    return {
      recipes: [],
      promises: [],
      recipes_: [],
    };
  },
  watch: {
    isLogin: async function(newVal, lastVal) {
      if (newVal) {
        this.recipes.push;
        this.recipes = [];

        this.recipes_.map((r) => {
          this.promises.push(this.checkIfLogin(r));
        });
        let x = await Promise.all(this.promises);
        this.recipes.push(...this.recipes_);
      }
      // console.log(1234567, { newVal, lastVal });
    },
  },
  props: {
    isLogin: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  async mounted() {
    console.log("randomRecipePrev", "mounted");
    await this.updateRecipes();
    console.log(12345, this.recipes[0]);
  },
  beforeDestroy() {
    console.log("randomRecipePrev", "distroy");
  },
  methods: {
    async checkIfLogin(rec) {
      if (this.isLogin) {
        try {
          let responewatchedorfav;

          //favorite / watched
          try {
            // console.log(this.$route.params.recipeId);
            console.log(111111111111, rec.recipe_id);
            responewatchedorfav = await this.axios.get(
              this.$root.store.BASE_URL +
                "/profile/recipeInfo/" +
                "[" +
                rec.recipe_id +
                "]"
            );
            // console.log("response.status", response.status);
            if (responewatchedorfav.status !== 200)
              this.$router.replace("/NotFound");
          } catch (error) {
            this.$router.replace("/NotFound");
            return;
          }
          rec.favorite = responewatchedorfav.data[rec.recipe_id].favorite;
          if (this.type != "lastWatch") {
            rec.watched = responewatchedorfav.data[rec.recipe_id].watched;
          }
          console.log("****************************************");
          console.log(222222222, this.rec.watched);
        } catch (error) {
          console.log(error);
        }
      }
    },

    async updateRecipes() {
      try {
        let response = [];
        if (this.type == "random") {
          response = await this.axios.get(
            this.$root.store.BASE_URL + "/recipes/random"
          );
        } else {
          if (this.type == "lastWatch") {
            response = await this.axios.get(
              this.$root.store.BASE_URL + "/profile/watchedList/top"
            );
          } else {
            if (this.type == "search") {
              response1 = await this.axios.get(
                this.$root.store.BASE_URL +
                  "/profile/recipeInfo/" +
                  this.cur_recipe.recipe_id
              );
              console.log(response1);
              response2 = await this.axios.get(
                this.$root.store.BASE_URL +
                  "/recipes/displayPreviewRecipe/recipeId/" +
                  this.cur_recipe.recipe_id
              );
              console.log(response2);
            }
          }
          // if(this.type=='lastWatch'&& !this.$root.store.lastWatch){
          //     response = await this.axios.get(
          // this.$root.store.BASE_URL + "/profile/watchedList/top"

          // );

          // }
          // if(this.type=='lastWatch'&& !!this.$root.store.lastWatch){
          //     response = {};
          //     response.data=this.$root.store.lastWatch;

          // }
        }

        this.recipes_ = response.data;
        console.log(response);
        console.log(this.recipes_);
        this.recipes.push;
        this.recipes = [];

        console.log("start check33333333***********************");

        this.recipes_.map((r) => {
          // this.recipes.map((r) => {
          this.promises.push(this.checkIfLogin(r));
        });
        let x = await Promise.all(this.promises);
        // this.$forceUpdate();
        this.recipes.push(...this.recipes_);
        // if(!this.$root.store.lastWatch){
        //  console.log(this.$root.store.login);
        // this.$root.store.addWatchedList(this.recipes)
        // }
        console.log(123123, this.recipes_);
        console.log(11121212, this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
#app {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s;
}

ul {
  list-style-type: none;
}

@import url("https://fonts.googleapis.com/css?family=Do+Hyeon");
/* div {
  font-family: 'Do Hyeon', sans-serif;
   text-align: center;
} */
.title_left {
  color: thistle;
}
</style>
