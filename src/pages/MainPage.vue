<template>
  <div class="d-md-flex h-md-100 align-items-center">
    <!-- First Half -->

    <div class="col-md-7 p-0 bg-indigo h-md-100">
      <div
        class="text-white d-md-flex align-items-center h-100 p-5 text-center justify-content-center"
      >
        <div class="logoarea pt-5 pb-5">
          <RandomRecipesPreviewList></RandomRecipesPreviewList>
          <!-- <RecipePreviewList></RecipePreviewList>
          <RecipePreviewList
            title="Random"
            :class="{
              RandomRecipes: true,
              blur: !$root.store.username,
              center: true,
            }"
            disabled
          ></RecipePreviewList> -->
 
        </div>
      </div>
    </div>

    <!-- Second Half -->

    <div class="col-md-5 p-0 bg-white h-md-100 loginarea">
      <div
        class="d-md-flex align-items-center h-md-100 p-5 justify-content-center"
      >
        <div v-if="!$root.store.username">
          <LoginPage></LoginPage>
        </div>
        <div v-else>
          <RecipePreviewListLastWatch
            title="Last Viewed Recipes"
            :class="{
              RandomRecipes: true,
              blur: !$root.store.username,
              center: true,
            }"
          ></RecipePreviewListLastWatch>
        </div>
      </div>
    </div>

    <router-link to="/family" tag="button" />
  </div>

  <!-- <div class="container-fluid">
    
    <div class="row no-gutter">
      <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image">
        <RecipePreviewList
          title="Last Viewed Recipes"
          :class="{
            RandomRecipes: true,
            blur: !$root.store.username,
            center: true,
          }"
          disabled
        ></RecipePreviewList>

        <LoginPage></LoginPage>
      </div>
      <div class="col-md-8 col-lg-6">
        <div class="login d-flex align-items-center py-5">
          <div class="container">
            <div class="row">
              <div class="col-md-9 col-lg-8 mx-auto">
                <h1 class="title">Main Page</h1>
                <RecipePreviewList
                  title="Randome Recipes"
                  class="RandomRecipes center"
                />
                <router-link
                  v-if="!$root.store.username"
                  to="/login"
                  tag="button"
                  >You need to Login to vue this</router-link
                >
                {{ !$root.store.username }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>
  </div> -->
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import RandomRecipesPreviewList from "../components/RandomRecipesPreviewList";


import LoginPage from "../pages/LoginPage.vue";
import RecipePreviewListLastWatch from "../components/RecipePreviewListLastWatch";

export default {
  components: {
    // RecipePreviewList,
    RandomRecipesPreviewList,
    LoginPage,
    RecipePreviewListLastWatch,
  },
};
</script>

//
<style lang="scss" scoped>
// .RandomRecipes {
//   // margin: 10px 0 10px;
// }
// .blur {
//   -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
//   filter: blur(2px);
// }
// ::v-deep .blur .recipe-preview {
//   pointer-events: none;
//   cursor: default;
// }

:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}
@media (min-width: 768px) {
  .h-md-100 {
    height: 100vh;
  }
}
.btn-round {
  border-radius: 30px;
}
.bg-indigo {
  background: indigo;
}
.text-cyan {
  color: #35bdff;
}
// .login,
// .image {
//   min-height: 100vh;
// }

// .bg-image {
//   background-image: url("https://source.unsplash.com/WEQbe2jBg40/600x1200");
//   background-size: cover;
//   background-position: center;
// }

// .login-heading {
//   font-weight: 300;
// }

// .btn-login {
//   font-size: 0.9rem;
//   letter-spacing: 0.05rem;
//   padding: 0.75rem 1rem;
//   border-radius: 2rem;
// }

// .form-label-group {
//   position: relative;
//   margin-bottom: 1rem;
// }

// .form-label-group > input,
// .form-label-group > label {
//   padding: var(--input-padding-y) var(--input-padding-x);
//   height: auto;
//   border-radius: 2rem;
// }

// .form-label-group > label {
//   position: absolute;
//   top: 0;
//   left: 0;
//   display: block;
//   width: 100%;
//   margin-bottom: 0;
//   /* Override default `<label>` margin */
//   line-height: 1.5;
//   color: #495057;
//   cursor: text;
//   /* Match the input under the label */
//   border: 1px solid transparent;
//   border-radius: 0.25rem;
//   transition: all 0.1s ease-in-out;
// }

// .form-label-group input::-webkit-input-placeholder {
//   color: transparent;
// }

// .form-label-group input:-ms-input-placeholder {
//   color: transparent;
// }

// .form-label-group input::-ms-input-placeholder {
//   color: transparent;
// }

// .form-label-group input::-moz-placeholder {
//   color: transparent;
// }

// .form-label-group input::placeholder {
//   color: transparent;
// }

// .form-label-group input:not(:placeholder-shown) {
//   padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
//   padding-bottom: calc(var(--input-padding-y) / 3);
// }

// .form-label-group input:not(:placeholder-shown) ~ label {
//   padding-top: calc(var(--input-padding-y) / 3);
//   padding-bottom: calc(var(--input-padding-y) / 3);
//   font-size: 12px;
//   color: #777;
// }

// /* Fallback for Edge
// -------------------------------------------------- */

// @supports (-ms-ime-align: auto) {
//   .form-label-group > label {
//     display: none;
//   }
//   .form-label-group input::-ms-input-placeholder {
//     color: #777;
//   }
// }

// /* Fallback for IE
// -------------------------------------------------- */

// @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
//   .form-label-group > label {
//     display: none;
//   }
//   .form-label-group input:-ms-input-placeholder {
//     color: #777;
//   }
// }
</style>
