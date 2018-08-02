import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)

export default new VueX.Store({
  state: {
    exercise: {
      src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      questions: []
    },
    toUpdate: null
  },
  mutations: {
    setExercise (state, exercise) {
      state.exercise = exercise
    },
    addQuestion (state, question) {
      state.exercise.questions.push(question)
    },
    setToUpdate (state, id) {
      state.toUpdate = id
    },
    edit (state, question) {
      const id = state.toUpdate
      state.exercise.questions[id] = question
    },
    remove (state, id) {
      state.exercise.questions.splice(id, 1)
    }
  },
  getters: {
    getExercise (state) {
      return state.exercise
    },
    getQuestions (state) {
      return state.exercise.questions
    },
    isToUpdate ({ toUpdate }) {
      if (toUpdate !== null) return true
      else return false
    }
  }
})
