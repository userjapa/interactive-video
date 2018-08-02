<template>
<div class="fixed container align-center" v-if="showModal">

  <div class="modal">
    <div class="modal-title">
      <h1>{{question.question}}</h1>
    </div>

    <div class="modal-content">
      <ul class="list-style-none modal-questions">
        <li v-for="(answr, index) in question.answers"
            @click="select(answr, $event.target)"
            :class="{
              correct: answr.correct && question.answered,
              wrong: !answr.correct && question.answered && answr.selected
            }">

          <div class="container align-items-center">
            <div class="ball" :class="{active : answr.selected}"></div>
            {{ answr.text }}
          </div>

        </li>
      </ul>
    </div>

    <div class="modal-btn margin-top-20">
      <button type="button" name="button" class="btn btn-primary" @click="nextQuestion()" :disabled="!question.answered" :class="{disabled : !question.answered}">Continuar</button>
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
      index: 0,
      showModal: false,
      ended: false
    }
  },
  methods: {
    select(answer, target) {
      if (!this.question.answered) {
        answer.selected = true
        this.question.answered = true
      }
    },
    setMessage() {
      this.showModal = true
      this.selected = false
    },
    nextQuestion() {
      this.showModal = false
      answerBus.$emit('play')
    }
  },
  props: [
    'question'
  ],
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
