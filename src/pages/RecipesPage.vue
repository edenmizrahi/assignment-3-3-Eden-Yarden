<template>
  <div>
    <p>
      {{ this.title_ }}
    </p>
    <ul :style="gridStyle" class="card-list">
      <li v-for="(card, index) in recipes" class="card-item" :key="index">
        <RecipePreview :recipe="card" :type="title"></RecipePreview>
      </li>
    </ul>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview.vue";

export default {
  name: "RecipesPage",
  components: {
    RecipePreview,
    // RecipePreviewList,
  },
  watch: {
    $route(to, from) {
      this.numberOfColumns = to.params.numberOfColumns;
      this.title = to.params.title;
      this.inStart();
    },
  },
  computed: {
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.numberOfColumns_}, minmax(100px, 1fr))`,
      };
    },
  },
  props: {
    numberOfColumns: {
      type: Number,
      require: false,
    },
    title: { type: String, require: false },
  },
  data() {
    return {
      recipes: [],
      title_: "",
      numberOfColumns_: 3,
    };
  },
  async mounted() {
    await this.inStart();
  },
  methods: {
    async inStart() {
      console.log(1234567890000, this.title);
      console.log(1234567890000, this.numberOfColumns);

      try {
        let response = [];
        console.log("title", this.title);
        console.log("title_", this.title_);

        if (this.title) {
          this.$root.store.recipePage = this.title;
        }
        //   if(!!this.title){
        //     this.title_=this.title;
        //   }
        //  console.log("title_",this.title_);

        //   if(!!this.numberOfColumns){
        //     this.numberOfColumns_=this.numberOfColumns;
        //   }
        this.title_ = this.$root.store.recipePage;
        console.log("title_", this.title_);
        if (this.title_ == "Favorite Recipes") {
          response = await this.axios.get(
            this.$root.store.BASE_URL + "/profile/favorite"
          );
        }
        if (this.title_ == "My Recipes") {
          response = await this.axios.get(
            this.$root.store.BASE_URL + "/profile/myRecipes"
          );

          console.log(123123123, response);
        }

        let recipes_ = response.data;
        console.log(1111, response.data);
        console.log(1111, recipes_);
        this.recipes.push;
        this.recipes = [];
        // this.$forceUpdate();
        this.recipes.push(...recipes_);
        console.log(1111, this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.card-list {
  display: grid;
  grid-gap: 1em;
}

.card-item {
  /* background-color: dodgerblue; */
  padding: 2em;
}

/* body {
  background: #20262e;
  padding: 20px;
  font-family: Helvetica;
} */

#app {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s;
}

ul {
  list-style-type: none;
}
</style>
