<template>
  <div class="container">
    <!-- <h1 class="title">{{ header }}</h1> -->
    <b-form @submit.prevent="onSearch" @reset.prevent="onReset">
      <!-- <b-form @reset.prevent="onReset"> -->
      <b-form-group
        id="input-group-query"
        label-cols-sm="2"
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
        label-cols-sm="2"
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
          Amount name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.amount.numeric">
          Amount must contain only numbers.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button-group style="width=100%">
        <b-form-group
          id="input-group-cuisine"
          label-cols-sm="3"
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
          label-cols-sm="3"
          label="Diet:"
          label-for="diet"
        >
        &nbsp;&nbsp;&nbsp;&nbsp;
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
          label-cols-sm="3"
          label="Intolerance:"
          label-for="intolerance"
        >
          &nbsp;&nbsp;&nbsp;&nbsp;
          <b-form-select
            id="intolerance"
            class="ml-4"
            v-model="$v.form.intolerance.$model"
            :options="intolerances"
            :state="validateState('intolerance')"
          ></b-form-select>
        </b-form-group>
        <br />
      </b-button-group>
      <br />
      <br />
      <b-button type="reset" variant="danger">Reset</b-button>
      &nbsp;&nbsp;
      <b-button type="submit" variant="primary">Search</b-button>
    </b-form>

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
        required,
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
    // console.log($v);
  },
  methods: {
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
      this.form = {
        query: "",
        amount: "",
        country: null,
      };
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
