<template>
  <div class="search">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <br />
    <br />
    <h1 class="title">{{ header }}:</h1>

    <FormSearch v-on:search-click-event="Search" v-on:reset-click-event="Reset">
    </FormSearch>
    <br />
    <br />
    <br />
    <div></div>
    <br />

    <div class="sort" v-if="this.aftersearch == 'true'">
      Sort By:
      <b-button-group>
        <b-button v-on:click="orderByLikes()">Likes</b-button>
        <b-button v-on:click="orderByTime()">Duration</b-button>
      </b-button-group>
    </div>
    <!-- <div v-if="recipes.length == 0">No Search Results.</div> -->
    <div class="noresults" :style="'display: `${resAns}`'">
      {{ this.results }}
    </div>
    <br />
    <div>
      <b-row v-for="line in numOfLines" :key="line">
        <RecipePreviewList
          title=" "
          :recipes="recipes.slice((line - 1) * 3, line * 3)"
        />
      </b-row>
    </div>
  </div>
</template>

<script>
// import countries from "../assets/countries";
import RecipePreviewList from "../components/RecipePreviewList";
import FormSearch from "../components/FormSearch";

import {
  required,
  minLength,
  maxLength,
  alpha,
  numeric,
  sameAs,
  email,
} from "vuelidate/lib/validators";

export default {
  name: "SearchPage",
  components: {
    FormSearch,
    RecipePreviewList,
  },
  data() {
    return {
      header: "Search Page",
      recipes: [],
      recipePerRow: 3,
      results: "",
      resAns: "",
      aftersearch: "",
    };
  },
  async mounted() {
    console.log("beforeCreated");
    // this.aftersearch = "false";
    this.ShowLastSearch();
    // console.log(this.$store.recipes);
    // if (this.$store.recipes != "") {
    //   this.recipes = this.$store.recipes;
    // }
  },
  computed: {
    numOfLines: function() {
      console.log(Math.ceil(this.recipes.length / 3));
      return Math.ceil(this.recipes.length / 3);
    },
    // afterSearch: function() {
    //   console.log(this.aftersearch);
    //   return this.aftersearch;
    // },
  },
  methods: {
    ShowLastSearch() {
      try {
        if (this.$root.store.username) {
          if (localStorage.loadRecipes) {
            this.recipes = JSON.parse(localStorage.loadRecipes);
            // this.recipes = localStorage.recipes;
          } else {
            if (localStorage.loadRecipes) {
              localStorage.removeItem("loadRecipes");
            }
          }
        }
      } catch (error) {}
    },
    async Search(query, amount, cuisine, diet, intolerance) {
      let response;
      try {
        this.results = "";
        console.log("enter to search func");
        let validAmount = amount;
        if (validAmount == "") {
          validAmount = 5;
        }
        response = await this.axios.get(
          this.$root.store.BASE_URL +
            "/recipes/search/query/" +
            query +
            "/amount/" +
            validAmount,
          {
            params: { cuisine: cuisine, diet: diet, intolerance: intolerance },
          }
        );

        if (response.status === 404) {
          this.$router.replace("/NotFound");
        } else {
          console.log("after endpoint search");
          console.log(response);
          this.resAns = "none";
          const recipes_ = response.data;
          console.log(recipes_);

          this.recipes.push;
          this.recipes = [];
          this.recipes.push(...recipes_);

          localStorage.setItem("loadRecipes", JSON.stringify(this.recipes));
          localStorage.setItem("query", query);
          localStorage.setItem("amount", amount);
          localStorage.setItem("cuisine", cuisine);
          localStorage.setItem("diet", diet);
          localStorage.setItem("intolerance", intolerance);
          // localStorage.setItem("LoadRecipes", JSON.stringify(this.recipes));
          // console.log(this.$root.store.search);
          // this.$root.store.search(
          //   this.recipes,
          //   query,
          //   amount,
          //   cuisine,
          //   diet,
          //   intolerance
          // );
          /**show sort option**/
          this.aftersearch = "true";

          if (response.status !== 200) this.$router.replace("/NotFound");
        }
      } catch (err) {
        console.log(err.response);
        if (err.response.statusText == "Not Found") {
          // this.$("noresults").show();
          this.recipes = [];
          this.resAns = "block";
          this.aftersearch = "false";
          this.results = "No recipes found for search results";
        }
        //   // this.$router.replace("/NotFound");
        //   alert("No found search results");
        // this.form.submitError = err.response.data.message;
      }
    },
    orderByTime() {
      let sortrecipes = this.recipes;
      sortrecipes.sort(function(a, b) {
        return a.readyInMinutes - b.readyInMinutes;
      });

      this.recipes.push;
      this.recipes = [];
      this.recipes.push(...sortrecipes);
    },
    orderByLikes() {
      let sortrecipes = this.recipes;
      sortrecipes.sort(function(a, b) {
        return a.aggregateLikes - b.aggregateLikes;
      });

      this.recipes.push;
      this.recipes = [];
      this.recipes.push(...sortrecipes);
    },
    async Reset() {
      console.log("in Reset");
      this.resAns = "none";
      this.results = "";
      this.recipes.push;
      this.recipes = [];
      this.aftersearch = "false";
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  // max-width: 500px;
  width: 100%;
  height: auto;
  font-family: "Raleway", cursive;
  // background: url("https://res.cloudinary.com/dc9fdssoo/image/upload/v1594561158/background/36811008-raw-pasta-with-ingredients-on-wooden-background_fsytts.jpg");
   background: url("https://res.cloudinary.com/dc9fdssoo/image/upload/v1594563633/background/various-fresh-vegetables-organic-food-healthy-rustic-background_44537-627_bup06t.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  // position: fixed;
  // background: url("https://res.cloudinary.com/dc9fdssoo/image/upload/v1594561154/background/60214490-menu-food-culinary-frame-concept-on-black-background_whofgy.jpg")
  //   no-repeat;
  // background-repeat: no-repeat;
  // background-position: center;
  // -webkit-background-size: contain;
  // -moz-background-size: contain;
  // -o-background-size: contain;
  // background-size: cover;
}

.title{
  margin-left: 100px;
}

// .container::before {
//   content: '';
//   display: block;
//   position: absolute;
//   min-height: 100%;
//   min-width: 1024px;
//   // position: fixed;
//   background: url("https://res.cloudinary.com/dc9fdssoo/image/upload/v1594561154/background/60214490-menu-food-culinary-frame-concept-on-black-background_whofgy.jpg");
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center;
//   background-attachment: fixed;
//   z-index: -1;
//   // color: #2c3e50;
//   width: 100%;
//   height: auto;
//   top: 0;
//   left: -100;
// }
</style>
