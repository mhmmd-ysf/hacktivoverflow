<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation v-on:submit.prevent="login">
          <center>
            <h2>Login to continue</h2>
          </center>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-btn color="info" type="submit">Let's Go!</v-btn>
          <v-btn color="error" @click="reset">Reset Form</v-btn>
          <br>
          <br>
          <h3>Don't have account?</h3>
          <router-link to="/register" style="textDecoration:none;">
            <v-btn color="success">Register</v-btn>
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
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      valid: true,
      show1: false,
      emailRules: [
        input => !!input || 'Email is required',
        input => /.+@.+/.test(input) || 'Invalid email',
      ],
      rules: {
        required: input => !!input || 'Required',
      },
    };
  },
  methods: {
    login() {
      // login
      const user = {
        email: this.email,
        password: this.password,
      };
      axios
        .post(`${url}/login`, user)
        .then(({ data }) => {
          console.log({ data, dari: 'login'})
          window.localStorage.setItem('token', data.access_token);
          window.localStorage.setItem('id', data.id);
          window.localStorage.setItem('name', data.name);
          window.localStorage.setItem('email', data.email);
          this.$store.dispatch('login', data);
          return swal('Success', 'Berhasil login!', 'success');
        })
        .then(() => {
          this.$router.replace('/');
        })
        .catch((err) => {
          console.log({ err });
          swal(
            `Error ${err.response.status}: ${err.response.statusText}`,
            err.response.data.err,
            'error',
          );
        });
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
.container {
  max-width: 30% !important;
  margin-top: 4%;
}
</style>
