<template>
  <div>
    <div v-if="type != 'My Recipes'">
      <p class="h1 mb-2">
        <b-icon-eye-fill
          v-if="recipe.watched == true"
          style=" position: absolute;
  top: 270px;
  left: 20;"
        ></b-icon-eye-fill>
      </p>
      <div
        @click="addTofavorite"
        v-if="$root.store.username && cur_recipe.favorite == false"
        class="circle"
        style=" position: absolute;
  top: 50px;
  left: -10px;  "
      >
        <p class="h1 mb-2">
          <b-icon-heart-fill
            style="color:white; position: absolute;
  top: 12px;
  left: 8;"
          ></b-icon-heart-fill>
        </p>
      </div>
      <p class="h1 mb-2">
        <b-icon-heart-fill
          class="favorite"
          variant="danger"
          v-if="$root.store.username && cur_recipe.favorite == true"
          style=" position: absolute;
   top: 60px;
  left: 0px;  "
        ></b-icon-heart-fill>
      </p>

      <router-link
        v-if="type != 'My Recipes'"
        :to="{
          name: 'recipe',
          params: { recipeId: this.cur_recipe.recipe_id },
        }"
        class="recipe-preview"
      >
        <table
          class="center"
          style="  border: 2px solid red;
  border-radius: 50px 20px; width:300px;height:300px;"
        >
          <tr>
            <td colspan="5" style="height:80px">
              {{ this.cur_recipe.title }}
            </td>
          </tr>

          <tr>
            <td
              colspan="5"
              v-bind:style="{
                'background-image': 'url(' + cur_recipe.image + ')',
              }"
              style="width:300px;height:200px;background-size: 300px 200px;"
            >
            </td>
          </tr>

          <tr style="height:100px">
            <th>
              <b-icon-alarm></b-icon-alarm><br />{{
                cur_recipe.readyInMinutes
              }}
              Min
            </th>
            <th>
              <b-icon-hand-thumbs-up variant="primary"></b-icon-hand-thumbs-up
              >{{ cur_recipe.aggregateLikes }}
            </th>
            <th>
              <img
                v-if="cur_recipe.glutenFree"
                src="https://img.icons8.com/office/40/000000/no-gluten.png"
              />
              <img
                v-else
                src="https://res.cloudinary.com/dc9fdssoo/image/upload/v1594580970/gluten-removebg-preview_r21yif.png"
                style="width:60px"
              />
            </th>
            <th>
              <!-- <img v-if="cur_recipe.vegan" src="https://ibb.co/gJKncw6" /> -->
              <a v-if="cur_recipe.vegan"
                ><img
                  src="https://i.ibb.co/PgHSV4t/leaf.png"
                  alt="leaf"
                  border="0"
                  style="width:30px;height:30px; margin:0 0 0 0; padding: 0 0 0 0 ; "
              /></a>
              <br />

              <!-- </th>
            <th> -->
              <!-- <img  v-if="cur_recipe.vegetarian" src="https://ibb.co/gJKncw6" /> -->

              <a v-if="cur_recipe.vegetarian" href="https://imgbb.com/"
                ><img
                  src="https://i.ibb.co/PgHSV4t/leaf.png"
                  alt="leaf"
                  border="0"
                  style="width:30px;height:30px;"
              /></a>
            </th>
          </tr>
        </table>
      </router-link>
    </div>
    <div v-else>
      <router-link
        :to="{
          name: 'PersonalViewPage',
          params: { type: 'my', recipeId: recipe.recipe_id },
        }"
        class="recipe-preview"
      >
        <table
          class="center"
          style="  border: 2px solid red;
  border-radius: 50px 20px; width:300px;height:300px;"
        >
          <tr>
            <td colspan="5" style="height:80px">
              {{ this.cur_recipe.title }}
            </td>
          </tr>

          <tr>
            <td
              colspan="5"
              v-bind:style="{
                'background-image': 'url(' + cur_recipe.image + ')',
              }"
              style="width:300px;height:200px;background-size: 300px 200px;"
            >
            </td>
          </tr>

          <tr style="height:100px">
            <th>
              <b-icon-alarm></b-icon-alarm>{{ cur_recipe.readyInMinutes }} Min
            </th>
            <th></th>
            <th>
              <img
                v-if="cur_recipe.glutenFree"
                src="https://img.icons8.com/office/40/000000/no-gluten.png"
              />
            </th>
            <th>
              <!-- <img v-if="cur_recipe.vegan" src="https://ibb.co/gJKncw6" /> -->
              <a v-if="cur_recipe.vegan" href="https://imgbb.com/"
                ><img
                  src="https://i.ibb.co/PgHSV4t/leaf.png"
                  alt="leaf"
                  border="0"
                  style=" width:30px;height:30px;"
              /></a>
              <!-- </th>
            <th> -->
              <!-- <img  v-if="cur_recipe.vegetarian" src="https://ibb.co/gJKncw6" /> -->

              <a v-if="cur_recipe.vegetarian" href="https://imgbb.com/"
                ><img
                  src="https://i.ibb.co/PgHSV4t/leaf.png"
                  alt="leaf"
                  border="0"
                  style=" width:30px;height:30px;"
              /></a>
            </th>
          </tr>
        </table>
      </router-link>
    </div>
  </div>
</template>

<script>
var selected = "js-is-selected";

export default {
  watch: {
    recipe: async function(newVal, lastVal) {
      if (newVal) {
        this.cur_recipe = newVal;
      }
    },
  },
  name: "RecipePreview",
  async mounted() {
    // await this.checkIfLogin();
    this.cur_recipe = this.recipe;
  },
  data() {
    return {
      image_load: false,
      cur_recipe: this.recipe,
    };
  },
  props: {
    type: {
      type: String,
      required: false,
    },
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
        // console.log(this.$route.params.recipeId);
        responseAfterAddFavorite = await this.axios.put(
          "http://localhost:4000/profile/favorite/add/" +
            this.cur_recipe.recipe_id
        );

        // console.log(recipe);
        // console.log(recipe.data);
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

      // this.$refs.btnFavorite.innerText = "Already In Favorite";
      // this.$refs.btnFavorite.className = "fa fa-star";
    },
    async checkIfLogin() {
      try {
        let responewatchedorfav;

        //favorite / watched
        try {
          // console.log(this.$route.params.recipeId);
          responewatchedorfav = await this.axios.get(
            this.$root.store.BASE_URL +
              "/profile/recipeInfo/" +
              "[" +
              this.cur_recipe.recipe_id +
              "]"
          );

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
        this.cur_recipe.favorite =
          responewatchedorfav.data[this.cur_recipe.recipe_id].favorite;
        this.cur_recipe.watched =
          responewatchedorfav.data[this.cur_recipe.recipe_id].watched;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>

@import url("https://fonts.googleapis.com/css?family=Josefin+Sans:100,300,400,600,700|Work+Sans:100,200,300,400,500,600");
table {
  border-collapse: collapse;
  border-radius: 1em;
  overflow: hidden;
  color: black;
  background-color: #faf7d7;
}

th,
td {
  padding: 1em;
  background: #ddd;
  border-bottom: 2px solid white;
  background-color: #faf7d7b2;
}

.css-mine {
  margin-top: 2em;
  clear: both;
}

body {
  margin: 1.5em;
}
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
table:hover {
  color: #000000;
  border: 10px solid #ffffff;
  text-shadow: 0px 0px 20px #ffffff;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  font-size: 17px;
}
</style>
