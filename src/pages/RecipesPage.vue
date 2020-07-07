<template>
  <div>
    <ul :style="gridStyle" class="card-list" >
    <li v-for="(card, index) in recipes" class="card-item" :key="index">
      <RecipePreview :recipe="card"></RecipePreview>
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
   computed: {
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.numberOfColumns}, minmax(100px, 1fr))`
      }
    },
  },
    // props:{
    //     numOfCollumn:{
    //         type: Number,
    //         require: true,
    //     },
    //     recipes:{ 
    //         type:Array,
    //         require:true,
    //     },
    //     title: {type: String, require: true,},
    // },
    data(){
        return {
        numberOfColumns:3,
        recipes:[],
        title: ""
        }
    },
      async mounted() {
          if(!!this.$route.params.name&&!!this.$route.params.numberOfColumns){
          console.log(45678,this.$route.params.numberOfColumns)
          console.log(6789,this.$route.params.name)
          this.numberOfColumns=this.$route.params.numberOfColumns;
          this.title=this.$route.params.name;
          }

      try {
        let response=[];
        if(this.title=='favorites'){
            response = await this.axios.get(
            this.$root.store.BASE_URL + "/profile/favorite"
            );
        }

         this.recipes_ = response.data;
        console.log(response);
        console.log(this.recipes_);
        this.recipes.push;
        this.recipes = [];
        // this.$forceUpdate();
        this.recipes.push(...this.recipes_);
      } catch (error) {
        console.log(error);
      }
    }

}
</script>

<style>
.card-list {
  display: grid;
  grid-gap: 1em;
}

.card-item {
  background-color: dodgerblue;
  padding: 2em;
}

body {
  background: #20262E;
  padding: 20px;
  font-family: Helvetica;
}

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