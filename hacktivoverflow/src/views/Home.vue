<template>
  <div>
    <questions :questions="questions"></questions>
    <v-dialog v-model="dialog" max-width="600px" v-if="isLoggedIn">
      <template v-slot:activator="{ on }">
        <v-btn color="blue" dark fixed bottom right fab v-on="on"><v-icon>add</v-icon></v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Ask a question</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Title*" hint="E.g. What is Vue.js?" v-model="title"></v-text-field><br>
              </v-flex>
              <v-textarea label="Description*" v-model="description"></v-textarea>
            </v-layout>
          </v-container>
          <small>*Required</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="askQuestion">Ask</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
import questions from '../components/Questions.vue';

const url = 'http://localhost:3000'

export default {
  props: ['isLoggedIn'],
  data() {
    return {
      dialog: false,
      title: '',
      description: '',
      questions: [],
    };
  },
  components: {
    questions,
  },
  methods: {
    askQuestion() {
      axios.defaults.headers.common.token = window.localStorage.token
      const newQuestion = {
        title: this.title,
        description: this.description,
      }
      axios.post(`${url}/questions`, newQuestion)
        .then((data) => {
          return swal('Question posted!', 'Now let\'s wait until someone answer your question.', 'success')
        })
        .then((click) => {
          this.$router.replace('/');
          this.dialog = false;
        })
        .catch((err) => {
          swal(
            `Error ${err.response.status}: ${err.response.statusText}`,
            err.response.data.error,
            'error',
          );
          console.log({err})
        })
    },
    getQuestions() {
      axios.get(`${url}/questions`)
        .then(({ data }) => {
          this.questions = data;
        })
        .catch((err) => {
          swal(
            `Error ${err.response.status}: ${err.response.statusText}`,
            err.response.data.err,
            'error',
          );
        })
    }
  },
  mounted() {
    this.getQuestions()
  },
};
</script>
