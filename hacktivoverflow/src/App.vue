<template>
  <v-app>
    <v-toolbar app dark>
        <router-link to="/" style="textDecoration: none;">
      <v-toolbar-title class="headline text-uppercase">
          <span>Hacktiv</span>
          <span class="font-weight-light">Overflow</span>
      </v-toolbar-title>
        </router-link>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6 md3>
          <v-text-field
            placeholder="Search question here"
          ></v-text-field>
        </v-flex>
        <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn flat target="_blank">
        <span class="mr-2" v-if="isLoggedIn">{{userName}}</span>
      </v-btn>
      <router-link to="/login" v-if="!isLoggedIn">
        <v-btn>
        Login
        </v-btn>
      </router-link>
      <v-btn v-if="isLoggedIn" color="error" @click="logout">
        Logout
      </v-btn>
    </v-toolbar>

    <v-content>
      <!--  -->
      <router-view :isLoggedIn="isLoggedIn"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import swal from 'sweetalert';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    // HelloWorld,
  },
  data() {
    return {
      // dialog: false,
    };
  },
  computed: mapState(['isLoggedIn', 'userName']),
  mounted() {
    // this.$store.dispatch('login')
    this.checkLogin()
  },
  methods: {
    logout() {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('id');
      window.localStorage.removeItem('name');
      window.localStorage.removeItem('email');
      swal('SUCCESS!', 'Successfully logged out!', 'success')
        .then(() => {
          this.$store.commit('logout');
          this.$router.replace('/');
        })
        .catch((err) => {
          swal(
            `Error ${err.response.status}: ${err.response.statusText}`,
            err.message,
            'error');
        });
    },
    dialogClose() {
      this.dialog = false;
    },
    checkLogin() {
      if (!window.localStorage.token) {
        this.$store.commit('logout');
      } else {
        const user = {
          id: window.localStorage.id,
          email: window.localStorage.email,
          name: window.localStorage.name,
          access_token: window.localStorage.token,
        }
        this.$store.dispatch('login', user)
      }
    },
  },
};
</script>
