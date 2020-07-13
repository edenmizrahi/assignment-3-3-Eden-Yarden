<template>

  <div>
      <p class="h1 mb-2">
    <b-icon-eye-fill
 v-if="recipe.watched==true"  style=" position: absolute;
  top: 270px;
  left: 20;">
          </b-icon-eye-fill
>
  </p>
<div  @click="addTofavorite"  v-if="$root.store.username && cur_recipe.favorite == false"  class="circle" style=" position: absolute;
  top: 50px;
  left: -10px;  ">
 <!-- <p class="h1 mb-2"><b-icon-heart class="favorite" variant="danger" v-if="$root.store.username && cur_recipe.favorite == false" @click="addTofavorite"
        style=" position: absolute;
  top: 12px;
  left: 8;"></b-icon-heart></p> -->
      <p class="h1 mb-2"><b-icon-heart-fill  style="color:white; position: absolute;
  top: 12px;
  left: 8;"
      ></b-icon-heart-fill></p>
</div>
 <p  class="h1 mb-2"><b-icon-heart-fill class="favorite" variant="danger" v-if="$root.store.username && cur_recipe.favorite == true"
        style=" position: absolute;
   top: 60px;
  left: 0px;  "></b-icon-heart-fill></p>

     <router-link
      v-if="type != 'My Recipes'"
      :to="{ name: 'recipe', params: { recipeId: this.cur_recipe.recipe_id } }"
      class="recipe-preview"
    >  
    <table class="center" style="  border: 2px solid red;
  border-radius: 50px 20px; width:300px;height:300px;">

      <tr >
    <td colspan="5" style="height:80px"> 
   
      {{ this.cur_recipe.title }}
    </td>
  </tr>
    

            <tr>
              
    <td colspan="5" v-bind:style="{ 'background-image': 'url(' + cur_recipe.image + ')' }" style="width:300px;height:200px;background-size: 300px 200px;"> 
      <!-- <p class="h1 mb-2"><b-icon-heart class="favorite" variant="danger" v-if="$root.store.username && cur_recipe.favorite == false" @click="addTofavorite"
       style=" position: absolute;
  top: 60px;
  left: 0;" ></b-icon-heart></p>
      <p class="h1 mb-2"><b-icon-heart-fill  variant="danger" v-if="$root.store.username && cur_recipe.favorite == true" 
       style=" position: absolute;
  top: 60px;
  left: 0;"></b-icon-heart-fill></p> -->
      <!-- <img
            :src="recipe.image"
            class="recipe-image"
            style="width:300px;height:200px;"
          /> -->
          </td>
  </tr>
          <tr style="height:100px">
            <th><b-icon-alarm></b-icon-alarm>{{ cur_recipe.readyInMinutes }} Min</th>
            <th><b-icon-hand-thumbs-up variant="primary"></b-icon-hand-thumbs-up>{{ cur_recipe.aggregateLikes }} </th>
            <th >
              <img v-if="cur_recipe.glutenFree" src="https://img.icons8.com/office/40/000000/no-gluten.png" />
            </th>
            <th >
              <!-- <img v-if="cur_recipe.vegan" src="https://ibb.co/gJKncw6" /> -->
              <a v-if="cur_recipe.vegan" href="https://imgbb.com/"><img src="https://i.ibb.co/PgHSV4t/leaf.png" alt="leaf" border="0" style=" width:30px;height:30px;"></a>
            <!-- </th>
            <th> -->
              <!-- <img  v-if="cur_recipe.vegetarian" src="https://ibb.co/gJKncw6" /> -->
              
              <a v-if="cur_recipe.vegetarian"  href="https://imgbb.com/"><img src="https://i.ibb.co/PgHSV4t/leaf.png" alt="leaf" border="0" style=" width:30px;height:30px;"></a>
            </th>
          </tr>
        </table>
                </router-link>
<!--          
    <article class="recipe-card">
      <div id="carousel" class="recipe-pic-frame">
        <div id="sliderBox" class="slider-box">
          <div class="recipe-pic pic1" role="img"></div>
          <div class="recipe-pic pic2" role="img"></div>
          <div class="recipe-pic pic3" role="img"></div>
        </div>
      </div>
    </article>

    <div class="container">
      <div class="card">
        <div class="card-header">
          <div :title="recipe.title" class="recipe-title">
            {{ recipe.title }}
          </div>
        </div>
        <div class="card-body">
          <img
            :src="recipe.image"
            class="recipe-image"
            style="width:300px;height:200px;"
          />
        </div>
        <div class="card-footer">
          <ul class="recipe-overview">
            <li>{{ recipe.readyInMinutes }} minutes</li>
            <li  v-if="recipe.aggregateLikes" >{{ recipe.aggregateLikes }} likes</li>
          </ul>
          <ul class="recipe-overview">
            <li>Vegan: {{ recipe.vegan }}</li>
            <li>Vegetarian: {{ recipe.vegetarian }}</li>
            <li>Gluten Free: {{ recipe.glutenFree }}</li>
            <li v-if="$root.store.username&&recipe.favorite==true">
            Favorite: {{ recipe.favorite }}
          </li>
          <li v-if="recipe.watched==true" >
            Watched: {{ recipe.watched}} 
          </li>
          </ul>
       
        </div>
      </div>
    </div> -->
    
    <!-- <router-link
      v-else
      :to="{
        name: 'PersonalViewPage',
        params: { type: 'my', recipeId: recipe.recipe_id },
      }"
      class="recipe-preview"
    >
      <article class="recipe-card">
        <div id="carousel" class="recipe-pic-frame">
          <div id="sliderBox" class="slider-box">
            <div class="recipe-pic pic1" role="img"></div>
            <div class="recipe-pic pic2" role="img"></div>
            <div class="recipe-pic pic3" role="img"></div>
          </div>
        </div>
      </article>

      <div class="container">
        <div class="card">
          <div class="card-header">
            <div :title="recipe.title" class="recipe-title">
              {{ recipe.title }}
            </div>
          </div>
          <div class="card-body">
            <img
              :src="recipe.image"
              class="recipe-image"
              style="width:300px;height:200px;"
            />
          </div>
          <div class="card-footer">
            <ul class="recipe-overview">
              <li>{{ recipe.readyInMinutes }} minutes</li>
              <li v-if="recipe.aggregateLikes">
                {{ recipe.aggregateLikes }} likes
              </li>
            </ul>
            <ul class="recipe-overview">
              <li>Vegan: {{ recipe.vegan }}</li>
              <li>Vegetarian: {{ recipe.vegetarian }}</li>
              <li>Gluten Free: {{ recipe.glutenFree }}</li>
              <li v-if="$root.store.username && recipe.favorite == true">
                Favorite: {{ recipe.favorite }}
              </li>
              <li v-if="recipe.watched == true">
                Watched: {{ recipe.watched }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </router-link> -->
  </div>
</template>

<script>
var selected = "js-is-selected";

export default {
  name: "RecipePreview",
  // async mounted() {
  //   if (this.$root.store.username) {
  //     await this.checkIfLogin();
  //   }
  // },
  async mounted() {
    // await this.checkIfLogin();
    this.cur_recipe=this.recipe;
  },
  data() {
    return {
      image_load: false,
      cur_recipe:this.recipe,
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
/* .recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
} */

/************************** */
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans:100,300,400,600,700|Work+Sans:100,200,300,400,500,600");
table {
  border-collapse: collapse;
  border-radius: 1em;
  overflow: hidden;
}

th, td {
  padding: 1em;
  background: #ddd;
  border-bottom: 2px solid white; 
}

.css-mine {
  margin-top: 2em;
  clear: both;
}

body {
  margin: 1.5em;
}
.circle:hover{
    background-color:   rgb(0, 0, 0, 0.7) ;
        border:1px solid rgb(0, 0, 0,0.7);    

}
.circle {
    background-color:rgb(120, 120, 120,0.7);
    border:1px solid rgb(120, 120, 120,0.7);    
    height:60px;
    border-radius:50%;
    -moz-border-radius:50%;
    -webkit-border-radius:50%;
    width:60px;
}
table:hover {
  color: #000000;
  border:10px  solid #ffffff;
  text-shadow:0px 0px 20px #fdec6e;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  font-size: 19px;
}



</style>
