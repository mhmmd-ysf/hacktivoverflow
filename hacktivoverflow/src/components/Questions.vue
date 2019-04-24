<template>
  <div>
    <v-responsive class="container">
      <v-layout >
        <v-list two-line class="inner-container">
          <div class="question-list">
            <div v-for="(item, index) in questions" :key="index">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  {{item.upvotes - item.downvotes}}
                </v-list-tile-avatar>
                <v-list-tile :key="item.title" avatar @click="viewQuestion(item._id)">
                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="item.userName"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-tile>
            </div>
          </div>
          <div v-if="questionStatus==='view'" class="question-side">
            <!-- =================================== QUESTION =================================== -->
            <v-card class="question-details">
              <center>
                <h2>{{ title }}</h2>
                <small>{{name}}</small>
                <div style="display:flex; flex-direction: row; justify-content: center; align-items:center;">
                  <strong style="margin-right: 10px;">{{votes}}</strong>
                    <v-btn flat color="blue lighten-2" value="up" @click.prevent="upvote">
                      <v-icon>thumb_up</v-icon>
                    </v-btn>
                    <v-btn flat color="red lighten-2" value="down" @click.prevent="downvote">
                      <v-icon>thumb_down</v-icon>
                    </v-btn>
                </div>
              </center>
              <p>{{ description }}</p>
              <template >
                <v-btn color="primary" dark @click="questionReply">Reply</v-btn>
                <v-btn color="primary" dark @click="questionEdit">Edit</v-btn>
              </template>
            </v-card>
            <!-- =================================== ANSWERS =================================== -->
            <v-card class="question-details" v-for="(item, index) in answers" :key="index" color="grey lighten-5">
              <center>
                <h2>{{ item.title }}</h2>
                <small>{{item.userName}}</small>
                <div style="display:flex; flex-direction: row; justify-content: center; align-items:center;">
                  <div style="margin-right: 10px;">{{item.upvotes - item.downvotes}}</div>
                  <v-btn-toggle v-model="icon" >
                    <v-btn flat color="blue lighten-2" value="up" > <!-- @click.prevent="upvote" -->
                      <v-icon>thumb_up</v-icon>
                    </v-btn>
                    <v-btn flat color="red lighten-2" value="down" > <!-- @click.prevent="downvote" -->
                      <v-icon>thumb_down</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </div>
              </center>
              <p>{{ item.description }}</p>
              <!-- <template> -->
                <!-- <v-btn color="primary" dark @click="questionReply">Reply</v-btn> -->
                <!-- <v-btn color="primary" dark @click="questionEdit">Edit</v-btn> -->
              <!-- </template> -->
            </v-card>
          </div>
        </v-list>
      </v-layout>
    </v-responsive>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Ask a question</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap v-if="state === 'edit'">
              <v-flex xs12>
                <v-text-field label="Title*" hint="E.g. What is Vue.js?" v-model="title"></v-text-field><br>
              </v-flex>
              <v-textarea label="Description*" v-model="description"></v-textarea>
            </v-layout>
            <v-layout wrap v-if="state === 'reply'">
              <v-flex xs12>
                <v-text-field label="Title*" hint="E.g. What is Vue.js?" v-model="titleNew"></v-text-field><br>
              </v-flex>
              <v-textarea label="Description*" v-model="descriptionNew"></v-textarea>
            </v-layout>
          </v-container>
          <small>*Required</small>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" flat @click="deleteQuestion" v-if="state === 'edit'">Delete</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.prevent="reply(questionId)" v-if="state === 'reply'">Reply</v-btn>
          <v-btn color="blue darken-1" flat @click="editQuestion" v-if="state === 'edit'">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';

const url = 'http://localhost:3000'
axios.defaults.headers.common.token = window.localStorage.token

export default {
  name: "questions",
  props: ["questions"],
  data() {
    return {
      questionStatus: '',
      title: '',
      description: '',
      titleNew: '',
      descriptionNew: '',
      votes: 0,
      dialog: false,
      state: '',
      icon: '',
      questionId: '',
      answers: [],
      name: '',
    };
  },
  methods: {
    upvote(vote) {
      let obj = {
        vote: 'up',
      }
      axios.put(`${url}/questions/vote/${this.questionId}`, obj)
        .then(data => {
          console.log({data})
        })
        .catch(err => {
          const message = (error.data.error) ? error.data.error : error.data.message
          swal(message)
        })
    },
    downvote(vote) {
      let obj = {
        vote: 'down',
        // questionId: this.questionId,
      }
      axios.put(`${url}/questions/vote/${this.questionId}`, obj)
        .then(data => {
          console.log({data})
        })
        .catch(err => {
          const message = (error.data.error) ? error.data.error : error.data.message
          swal(message)
        })
    },
    questionReply() {
      this.state = 'reply';
      this.dialog = true;
    },
    questionEdit() {
      this.state = 'edit';
      this.dialog = true;
    },
    viewQuestion(id) {
      console.log({id, questions: this.questions});
      this.questionStatus = 'view';
      let question = this.questions.filter(item => {
        return item._id === id
      })
      question= question[0];
      this.title = question.title;
      this.description = question.description;
      this.votes = question.upvotes - question.downvotes;
      this.questionId = id;
      this.answers = question.answers
      this.name = question.userName
    },
    editQuestion(id) {
      console.log({ id, target: 'Edit question', dari: 'editQuestion'})
    },
    deleteQuestion(id) {
      console.log({id, target: 'Delete question', dari: 'deleteQuestion'})
    },
    reply() {
      axios.defaults.headers.common.token = window.localStorage.token
      console.log({ id: this.questionId, target: 'Reply question', dari: 'replyQuestion'})
      const newAnswer = {
        title: this.titleNew,
        description: this.descriptionNew,
        questionId: this.questionId,
      }
      axios.post(`${url}/answers`, newAnswer)
        .then(data => {
          return swal('Answer posted!', 'Answer posted', 'success')
        })
        .then((click) => {
          this.dialog = false;
          this.$router.replace('/');
        })
        .catch((err) => {
          const error = err.response
          const message = (error.data.error) ? error.data.error : error.data.message
          swal(
            `Error ${error.status}: ${error.statusText}`,
            message,
            'error'
          );
        });
    },
  },
};
</script>

<style>
.container {
  width: 100%;
  margin: 10px;
}
.inner-container {
  padding: 10px;
  width: 100%;
  display: flex;
}
.question-list {
  padding: 10px;
}
.question-details {
  padding: 10px;
  width: 400px;
}
.answer-details {
  padding: 10px;
  width: 400px;
}
</style>