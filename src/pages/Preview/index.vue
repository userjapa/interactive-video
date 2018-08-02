<template>
<div class="container wrap align-items-start full-width relative margin-bottom-20">
  <VideoPlayer :exercise="exercise" />
</div>
</template>
<script>
import VideoPlayer from '../../components/VideoPlayer'
import answerBus from '../../components/Answers/bus'

export default {
  name: "Preview",
  data() {
    return {
      answers: []
    }
  },
  methods: {
    setAnswers(answers) {
      this.answers = answers
    }
  },
  computed: {
    exercise () {
      return this.$store.getters['getExercise']
    }
  },
  components: {
    VideoPlayer,
  },
  mounted() {
    answerBus.$on('setAnswers', this.setAnswers)
  },
  beforeDestroy() {
    answerBus.$off('setAnswers', this.setAnswers)
  }
}
</script>
<style>
</style>
