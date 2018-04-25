<template>
<div class="container wrap align-items-start full-width relative margin-bottom-20">
  <VideoPlayer :video="video" />
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
    video() {
      return this.$store.getters['getVideo']
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
