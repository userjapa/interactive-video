<template>
<div class="container wrap align-items-start full-width relative margin-bottom-20">
  <VideoPlayer :video="video" />
</div>
</template>
<script>
import VideoPlayer from '../../components/VideoPlayer'

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
    video () {
      return this.$store.getters['getVideo']
    }
  },
  components: {
    VideoPlayer
  }
}
</script>
<style>
</style>
