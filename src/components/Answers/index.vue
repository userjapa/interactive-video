<template>
<div class="fixed container align-center" v-if="showModal">

  <div class="modal">
    <div class="modal-title">
      <h1>{{message}}</h1>
    </div>

    <div class="modal-content">
      <ul class="list-style-none modal-questions">
        <li v-for="(answr, index) in answersCopy" @click="select(answr, $event.target)" :ref="`answer${index}`">

          <div class="container align-items-center">
            <div class="ball" :class="{active : answr.selected}"></div>
            {{ answr.text }}
          </div>

        </li>
      </ul>
    </div>

    <div class="modal-btn margin-top-20">
      <button type="button" name="button" class="btn btn-primary" @click="nextQuestion()" :disabled="!selected" :class="{disabled : !selected}">Continuar</button>
    </div>
  </div>

</div>
</template>
<script>
import answerBus from './bus'
export default {
  name: "Answers",
  data() {
    return {
      answersCopy: [],
      message: '',
      showModal: false,
      selected: false
    }
  },
  methods: {
    select(answer, target) {
      if (!this.selected) {
        answer.selected = true
        if (answer.correct) target.classList.add("correct")
        else {
          const correctIndex = this.answersCopy.findIndex(x => x.correct)
          target.classList.add("wrong")
          this.$refs[`answer${correctIndex}`][0].classList.add("correct")
        }
        this.selected = true
      }
    },
    resetBackground() {
      for (let index in this.answers) {
        if (this.$refs[`answer${index}`]) {
          if (this.$refs[`answer${index}`][0])
            this.$refs[`answer${index}`][0].classList.add("wrong")
        }
      }
    },
    setMessage(message) {
      this.message = message
      this.showModal = true
      this.selected = false
    },
    nextQuestion() {
      this.showModal = false
      answerBus.$emit('play')
    }
  },
  props: [
    'answers'
  ],
  watch: {
    answers: function() {
      this.answersCopy = this.answers.slice()
      this.resetBackground()
    }
  },
  mounted() {
    answerBus.$on('setMessage', this.setMessage)
  },
  beforeDestroy() {
    answerBus.$off('setMessage', this.setMessage)
  }
}
</script>
<style lang="scss" scoped>
.fixed {
    background: rgba(0,0,0,.5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
