<template>
  <router-link
    :to="{ name: 'familyRecipe', params: { recipeId: recipe.recipe_id } }"
    class="recipe-preview"
  >
    <!-- <div class="recipe-body">
      <img v-if="image_load" :src="recipe.image" class="recipe-image" />
    </div> -->
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
            <li>{{ recipe.duration }} minutes</li>
          </ul>
          <ul class="recipe-overview">
            <li>Vegan: {{ recipe.vegan }}</li>
            <li>Vegetarian: {{ recipe.vegetarians }}</li>
            <li>Gluten Free: {{ recipe.glutenFree }}</li>
          </ul>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  // mounted() {
  //   this.axios.get(this.recipe.image).then((i) => {
  //     this.image_load = true;
  //   });
  // },
  data() {
    return {
      image_load: false,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>
