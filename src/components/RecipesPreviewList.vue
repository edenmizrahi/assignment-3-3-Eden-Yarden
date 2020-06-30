<template>
  <div>
    <div  v-if="type=='random'">
  <b-container>
    <h3>
     Random Recipes:
      <slot></slot>
    </h3>

    <b-row>
      <b-col v-for="r in this.recipes" :key="r.recipe_id">
        <RecipePreview class="recipePreview" v-bind:recipe="r" />
      </b-col>
    </b-row>
  </b-container>

    <br />
    <br />
    <br />
    <RandomRecipesAction
      v-on:random-click-event="updateRecipes"
    ></RandomRecipesAction>
  </div>
  <div  v-if="type=='lastWatch'" >
        <b-container>
    <h3>
   Last watched:
      <slot></slot>
    </h3>
    <b-col v-for="r in recipes" :key="r.id">
      <RecipePreview class="recipePreview" :recipe="r" />
    </b-col>
  </b-container>

  </div>

  </div>

</template>

<script>
import RandomRecipesAction from "./RandomRecipesAction.vue";
import RecipePreview from "./RecipePreview.vue";

export default {
  name: "RecipesPreviewList",
  components: {
    RecipePreview,
    // RecipePreviewList,
    RandomRecipesAction,
  },

  data() {
    return {
      recipes: [],
      promises: [],
      recipes_:[],
    };
  },
  watch: {
    isLogin: async function(newVal, lastVal) {
      if (newVal){
        // this.recipes_.map((r) => {
        //   // this.recipes.map((r) => {
        //   this.promises.push(this.checkIfLogin(r));
        // });
        // let x = await Promise.all(this.promises);
        // console.log(7777,this.recipes_)
        // this.recipes=[];
        // this.recipes.push(...this.recipes_);
        this.recipes.push;
        this.recipes = [];

        this.recipes_.map((r) => {
          // this.recipes.map((r) => {
          this.promises.push(this.checkIfLogin(r));
        });
        let x = await Promise.all(this.promises);
        // this.$forceUpdate();
        this.recipes.push(...this.recipes_);

         console.log(8888,this.recipes)

      } 
      // console.log(1234567, { newVal, lastVal });
    },
  },
  props: {
    isLogin: {
      type: Boolean,
      required: true,
    },
    type:{
      type:String,
            required: true,

    }
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
      if(this.isLogin){
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
        rec.favorite = responewatchedorfav.data[rec.recipe_id].favorite;
        if(this.type!='lastWatch'){
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
        let response=[];
        if(this.type=='random'){
         response = await this.axios.get(
          this.$root.store.BASE_URL + "/recipes/random"
        );
        }
        else{
          if(this.type=='lastWatch'){
              response = await this.axios.get(
          this.$root.store.BASE_URL + "/profile/watchedList/top"
        );
          }
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

        console.log(123123, this.recipes_);
        console.log(11121212, this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
