<template>
  <div class="container">
    <div>
      <!-- <b-card bg-variant="light" @submit.prevent="onSearch" @reset.prevent="onReset">
        <b-form-group
          label-cols-lg="3"
          label="Search"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
          <b-form-group
            id="input-group-query"
            label-cols-lg="3"
            label="query for search:"
            label-for="query"
          >
            <b-form-input
              id="query"
              v-model="$v.form.query.$model"
              type="text"
              :state="validateState('query')"
            ></b-form-input>

            <b-form-invalid-feedback v-if="!$v.form.query.required">
              query search is required
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.form.query.alpha">
              query search must contain only letters.
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            id="input-group-lastname"
            label-cols-sm="4"
            label-cols-lg="3"
            label="amount of result back:"
            label-for="amount"
          >
            <b-form-input
              id="amount"
              v-model="$v.form.amount.$model"
              type="number"
              :state="validateState('amount')"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!$v.form.amount.required">
              Amount by default is 5
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.form.amount.numeric">
              Amount must contain only numbers.
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            label="Ship via:"
            label-align-sm="right"
            class="mb-0"
          >
            <b-form-radio-group
              class="pt-2"
              :options="['Air', 'Courier', 'Mail']"
            ></b-form-radio-group>
          </b-form-group>

          <b-button-group>
            <b-form-group
              id="input-group-cuisine"
              label-cols-sm="4"
              label-cols-lg="4"
              label="Cuisine:"
              label-for="cuisine"
            >
              <b-form-select
                id="cuisine"
                v-model="$v.form.cuisine.$model"
                :options="cuisines"
                :state="validateState('cuisine')"
              ></b-form-select>
            </b-form-group>
            
            <b-form-group
              id="input-group-diet"
              label-cols-sm="4"
              label-cols-lg="4"
              label="Diet:"
              label-for="diet"
            >
              <b-form-select
                id="diet"
                v-model="$v.form.diet.$model"
                :options="diets"
                :state="validateState('diet')"
              ></b-form-select>
            </b-form-group>
            <br />
            <b-form-group
              id="input-group-intolerance"
              label-cols-sm="4"
              label-cols-lg="4"
              label="Intolerance:"
              label-for="intolerance"
            >
              <b-form-select
                id="intolerance"
                v-model="$v.form.intolerance.$model"
                :options="intolerances"
                :state="validateState('intolerance')"
              ></b-form-select>
            </b-form-group>
          </b-button-group>

          
        </b-form-group>
        
        <b-button type="reset" variant="danger">Reset</b-button>
          &nbsp;&nbsp;
          <b-button type="submit" variant="primary">Search</b-button>
 
      </b-card> -->
    </div>
    <br />
    <!-- <h1 class="title">{{ header }}</h1> -->
    <b-card bg-variant="light">
      <!-- <b-form-group
        label-cols-lg="3"
        label="Search"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-0"
      > -->
      <b-form @submit.prevent="onSearch" @reset.prevent="onReset">
        <!-- <b-form @reset.prevent="onReset"> -->
        <b-form-group
          id="input-group-query"
          label-cols-sm="4"
          label-cols-lg="3"
          label="Query for search:"
          label-for="query"
        >
          <b-form-input
            id="query"
            v-model="$v.form.query.$model"
            type="text"
            :state="validateState('query')"
          ></b-form-input>

          <b-form-invalid-feedback v-if="!$v.form.query.required">
            query search is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.query.alpha">
            query search must contain only letters.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-lastname"
          label-cols-sm="4"
          label-cols-lg="3"
          label="Amount of result back:"
          label-for="amount"
        >
          <b-form-input
            id="amount"
            v-model="$v.form.amount.$model"
            type="number"
            :state="validateState('amount')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.amount.required">
            Amount by default is 5
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.amount.numeric">
            Amount must contain only numbers.
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- <b-button-group> -->
        <b-form-group
          id="input-group-cuisine"
          label-cols-lg="3"
          label="Cuisine:"
          label-for="cuisine"
        >
          <b-form-select
            id="cuisine"
            v-model="$v.form.cuisine.$model"
            :options="cuisines"
          >
            <!-- <b-form-select-option :value="null"
              >You can sort by cuisine</b-form-select-option
            >
            <b-form-select-option :value="African"
              >African</b-form-select-option
            >
            <b-form-select-option :value="American"
              >American</b-form-select-option
            >
            <b-form-select-option :value="British"
              >British</b-form-select-option
            >
            <b-form-select-option :value="Cajun">Cajun</b-form-select-option>
            <b-form-select-option :value="Caribbean"
              >Caribbean</b-form-select-option
            >
            <b-form-select-option :value="Eastern_European"
              >Eastern European</b-form-select-option
            >
            <b-form-select-option :value="European"
              >European</b-form-select-option
            >
            <b-form-select-option :value="French">French</b-form-select-option>
            <b-form-select-option :value="German">German</b-form-select-option>
            <b-form-select-option :value="Greek">Greek</b-form-select-option>
            <b-form-select-option :value="Indian">Indian</b-form-select-option>
            <b-form-select-option :value="Irish">Irish</b-form-select-option>
            <b-form-select-option :value="Italian"
              >Italian</b-form-select-option
            >
            <b-form-select-option :value="Japanese"
              >Japanese</b-form-select-option
            >
            <b-form-select-option :value="Jewish">Jewish</b-form-select-option>
            <b-form-select-option :value="Korean">Korean</b-form-select-option>
            <b-form-select-option :value="Latin_American"
              >Latin American</b-form-select-option
            >
            <b-form-select-option :value="Mediterranean"
              >Mediterranean</b-form-select-option
            >
            <b-form-select-option :value="Mexican"
              >Mexican</b-form-select-option
            >
            <b-form-select-option :value="Middle_Eastern"
              >Middle Eastern</b-form-select-option
            >
            <b-form-select-option :value="Nordic">Nordic</b-form-select-option>
            <b-form-select-option :value="Southern"
              >Southern</b-form-select-option
            >
            <b-form-select-option :value="Spanish"
              >Spanish</b-form-select-option
            >
            <b-form-select-option :value="Thai">Thai</b-form-select-option>
            <b-form-select-option :value="Vietnamese"
              >Vietnamese</b-form-select-option
            > -->
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-diet"
          label-cols-lg="3"
          label="Diet:"
          label-for="diet"
        >
          <b-form-select
            id="diet"
            v-model="$v.form.diet.$model"
            :options="diets"
          >
            <!-- <template v-slot:first>
              <b-form-select-option :value="null" disabled
                >-- Please select an option --</b-form-select-option
              >
            </template>
            <b-form-select-option :value="Gluten_Free"
              >Gluten Free</b-form-select-option
            >
            <b-form-select-option :value="Ketogenic"
              >Ketogenic</b-form-select-option
            >
            <b-form-select-option :value="Vegetarian"
              >Vegetarian</b-form-select-option
            >
            <b-form-select-option :value="Lacto - Vegetarian"
              >Lacto-Vegetarian</b-form-select-option
            >
            <b-form-select-option :value="Ovo - Vegetarian"
              >Ovo-Vegetarian</b-form-select-option
            >
            <b-form-select-option :value="Vegan">Vegan</b-form-select-option>
            <b-form-select-option :value="Pescetarian"
              >Pescetarian</b-form-select-option
            >
            <b-form-select-option :value="Paleo">Paleo</b-form-select-option>
            <b-form-select-option :value="Primal">Primal</b-form-select-option>
            <b-form-select-option :value="Whole30"
              >Whole30</b-form-select-option
            > -->
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-intolerance"
          label-cols-lg="3"
          label="Intolerance:"
          label-for="intolerance"
        >
          <b-form-select id="intolerance" v-model="$v.form.intolerance.$model">
            <!-- <b-form-select-option :value="null"
              >You can sort by intolerance</b-form-select-option
            >
            <b-form-select-option :value="Dairy">Dairy</b-form-select-option>
            <b-form-select-option :value="Egg">Egg</b-form-select-option>
            <b-form-select-option :value="Gluten">Gluten</b-form-select-option>
            <b-form-select-option :value="Grain">Grain</b-form-select-option>
            <b-form-select-option :value="Peanut">Peanut</b-form-select-option>
            <b-form-select-option :value="Seafood"
              >Seafood</b-form-select-option
            >
            <b-form-select-option :value="Sesame">Sesame</b-form-select-option>
            <b-form-select-option :value="Shellfish"
              >Shellfish</b-form-select-option
            >
            <b-form-select-option :value="Soy">Soy</b-form-select-option>
            <b-form-select-option :value="Sulfite"
              >Sulfite</b-form-select-option
            >
            <b-form-select-option :value="Tree_Nut"
              >Tree Nut</b-form-select-option
            >
            <b-form-select-option :value="Wheat">Wheat</b-form-select-option> -->
          </b-form-select>
        </b-form-group>
        <!-- </b-button-group> -->
        <br />
        <b-button type="reset" variant="danger">Reset</b-button>
        &nbsp;&nbsp;
        <b-button type="submit" variant="primary">Search</b-button>
      </b-form>
      <!-- </b-form-group> -->
    </b-card>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      search failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import cuisines from "../assets/cuisines";
import diets from "../assets/diets";
import intolerances from "../assets/intolerances";

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
  name: "Form",
  data() {
    return {
      header: "Search Page",
      form: {
        query: "",
        amount: "",
        cuisine: null,
        diet: null,
        intolerance: null,
        submitError: undefined,
      },
      cuisines: [{ value: null, text: "", disabled: true }],
      diets: [{ value: null, text: "", disabled: true }],
      intolerances: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false,
      recipes: [],
    };
  },
  validations: {
    form: {
      query: {
        required,
        alpha,
      },
      amount: {
        // required,
        numeric,
      },
      cuisine: {},
      diet: {},
      intolerance: {},
    },
  },
  mounted() {
    // console.log("mounted");
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
    this.showLastForm();
    // $root.store.username
    // console.log($root.store.username);
    // console.log($v);
  },
  methods: {
    showLastForm() {
      try {
        if (this.$root.store.username) {
          if (localStorage.query) {
            this.query = localStorage.query;
            console.log(this.query);
            // this.$v.form.query = JSON.parse(localStorage.query);
            document.getElementById("query").value = this.query;
          } else {
            if (localStorage.loadRecipes) {
              localStorage.removeItem("query");
            }
          }

          if (localStorage.amount) {
            this.amount = localStorage.amount;
            document.getElementById("amount").value = this.amount;
          } else {
            if (localStorage.amount) {
              localStorage.removeItem("amount");
            }
          }

          if (localStorage.cuisine) {
            this.cuisine = localStorage.cuisine;
            console.log(this.cuisine);
            document.getElementById("cuisine").value = this.cuisine;
          } else {
            if (localStorage.cuisine) {
              localStorage.removeItem("cuisine");
            }
          }

          if (localStorage.diet) {
            this.diet = localStorage.diet;
            document.getElementById("diet").type_of_diet = this.diet;
          } else {
            if (localStorage.diet) {
              localStorage.removeItem("diet");
            }
          }

          if (localStorage.intolerance) {
            this.intolerance = localStorage.intolerance;
            document.getElementById("intolerance").value = this.intolerance;
          } else {
            if (localStorage.intolerance) {
              localStorage.removeItem("intolerance");
            }
          }
        }
      } catch (error) {}
    },
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    onSearch() {
      console.log("search method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      console.log("search method go");
      this.$emit(
        "search-click-event",
        this.form.query,
        this.form.amount,
        this.form.cuisine,
        this.form.diet,
        this.form.intolerance
      );
      //   this.Search();
    },
    onReset() {
      this.$emit("reset-click-event");
      this.form = {
        query: "",
        amount: "",
        cuisine: null,
        diet: null,
        intolerance: null,
      };

      document.getElementById("query").value = "";
      document.getElementById("amount").value = "";

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 800px;
}
</style>
