<template>
  <div id="app">
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Recipes </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'main' }">
              <b-icon-house-fill></b-icon-house-fill> Main
            </b-nav-item>
            <b-nav-item :to="{ name: 'search' }">
              <b-icon-search></b-icon-search> Search
            </b-nav-item>
            <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
          </b-navbar-nav>

          <b-navbar-nav v-if="$root.store.username">
            <b-nav-item-dropdown text="Personal" right>
              <!-- <b-dropdown-item :to="{ name: 'family' }"
                >Family recipes</b-dropdown-item
              > -->
              <b-dropdown-item  @click="clickHandler()"
                :to="{
                  name: 'familyRecipes',
                  params: { title: 'Family Recipes', numberOfColumns: 3 },
                }"
                >Family recipes</b-dropdown-item
              >
              <b-dropdown-item
                @click="clickHandler()"
                :to="{
                  name: 'recipesPage',
                  params: { title: 'Favorite Recipes', numberOfColumns: 4 },
                }"
              >
                Favorite recipes <b-icon-star-fill></b-icon-star-fill
              ></b-dropdown-item>
              <b-dropdown-item
                :to="{
                  name: 'myRecipesPage',
                  params: { title: 'My Recipes', numberOfColumns: 3 },
                }"
                >My recipes</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="{ name: 'about' }"
              ><b-icon-info-square></b-icon-info-square> About</b-nav-item
            >

            <b-nav-item-dropdown v-if="!$root.store.username" right>
              <template v-slot:button-content>
                <b-icon-person></b-icon-person> Hello Guest
              </template>
              <b-dropdown-item :to="{ name: 'register' }"
                >Register
              </b-dropdown-item>
              <b-dropdown-item :to="{ name: 'login' }">Login</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown v-else right>
              <template v-slot:button-content>
                <b-icon-person-fill></b-icon-person-fill>
                {{ $root.store.username }}
              </template>
              <b-dropdown-item @click="Logout()"
                >Log-out <b-icon-power></b-icon-power
              ></b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
// import {BIconClock} from 'bootstrap-vue'

export default {
  name: "App",
  mounted() {
    console.log(this.$cookies.get("session"));
  },
  methods: {
    clickHandler() {
      console.log("**********************clickHandler");
      this.$root.store.recipePage = "Favorite Recipes";
    },
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  min-height: 100vh;

}

// #app::before {
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

// .jumbotron {
//   background-image: url("https://res.cloudinary.com/dc9fdssoo/image/upload/v1594561154/background/60214490-menu-food-culinary-frame-concept-on-black-background_whofgy.jpg");
//   background-size: cover;
//   background-repeat: no-repeat;
// }

// #nav {
//   padding: 30px;
// }

// #nav a {
//   font-weight: bold;
//   color: #2c3e50;
// }

// #nav a.router-link-exact-active {
//   color: #42b983;
// }
</style>
