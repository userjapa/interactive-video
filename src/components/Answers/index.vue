<template>
<div class="fixed container align-center" v-if="showModal">

  <div class="modal">
    <h1>{{message}}</h1>

    <div v-for="(answr, index) in answersCopy" @click="select(answr, $event.target)" :ref="`answer${index}`">
      {{ answr.text }}
    </div>

    <div class="margin-top-20">
      <button type="button" name="button" class="btn btn-primary" @click="showModal = false" v-if="selected">Continuar</button>
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
        if (answer.correct) target.style['background-color'] = 'green'
        else {
          const correctIndex = this.answersCopy.findIndex(x => x.correct)
          target.style['background-color'] = 'red'
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
.correct {
  background: green;
}
.wrong {
  background: red;
}
</style>
