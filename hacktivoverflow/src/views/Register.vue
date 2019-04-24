<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation v-on:submit.prevent="register">
          <center>
            <h2>Register</h2>
          </center>
          <v-text-field v-model="name" :rules="[rules.required]"
          label="Name" required></v-text-field>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail"
          required></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-btn color="info" type="submit">Register!</v-btn>
          <v-btn color="error" @click="reset">Reset Form</v-btn>
          <br>
          <br>
          <h3>Already have an account?</h3>
          <router-link to="/login" style="textDecoration:none;">
            <v-btn color="success">Login</v-btn>
          </router-link>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import swal from 'sweetalert';
import axios from 'axios';

const url = 'http://localhost:3000';

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      valid: true,
      show1: false,
      emailRules: [
        input => !!input || 'Email required',
        input => /.+@.+/.test(input) || 'Email must be valid',
      ],
      rules: {
        required: input => !!input || 'Required',
        min: input => input.length >= 8 || 'Min 8 characters',
      },
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    register() {
      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      axios
        .post(`${url}/register`, newUser)
        .then(() => {
          return swal('Success!', 'Account created!', 'success');
        })
        .then(() => {
          this.$router.push('/');
        })
        .catch(err => swal(err.message));
    },
  },
};
</script>
