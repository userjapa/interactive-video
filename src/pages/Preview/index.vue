<template>
<div class="container wrap align-items-start full-width relative margin-bottom-20">
  <VideoPlayer :exercise="exercise" />
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
  computed: {
    exercise () {
      return this.$store.getters['getExercise']
    }
  },
  components: {
    VideoPlayer,
  }
}
</script>
<style>
</style>
