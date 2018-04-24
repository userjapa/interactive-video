<template>
  <div class="item">
    <div v-for="(answr, index) in answersCopy" @click="select(answr, $event.target)" :ref="`answer${index}`">
      {{ answr.text }}
    </div>
  </div>
</template>
<script>
export default {
  name: "Answers",
  data () {
    return {
      answersCopy: []
    }
  },
  methods: {
    select (answer, target) {
      if (!this.answers.selected) {
        if (answer.correct) target.style['background-color'] = 'green'
        else {
          const correctIndex = this.answers.findIndex(x => x.correct)
          target.style['background-color'] = 'red'
          this.$refs[`answer${correctIndex}`][0].style['background-color'] = 'green'
        }
        this.answers.selected = true
      }
    },
    resetBackground () {
      for (let index in this.answers) {
        if (this.$refs[`answer${index}`]) {
          if (this.$refs[`answer${index}`][0])
            this.$refs[`answer${index}`][0].style['background-color'] = ''
        }
      }
    }
  },
  props: [
    'answers'
  ],
  watch: {
    answers: function () {
      this.answersCopy = this.answers.slice()
      this.resetBackground()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
