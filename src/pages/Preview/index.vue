<template>
<div class="container wrap align-items-start full-width relative margin-bottom-20">
  <VideoPlayer :exercise="exercise" />
</div>
</template>
<script>
import _ from 'lodash'
import VideoPlayer from '../../components/VideoPlayer'

export default {
  name: "Preview",
  computed: {
    exercise () {
      const exercise = _.cloneDeep(this.$store.getters['getExercise'])
      for (let qst of exercise.questions) {
        for (let aswr of qst.answers) {
          this.$set(aswr, 'selected', false)
        }
        this.$set(qst, 'answered', false)
        this.$set(qst, 'hit', false)
      }
      return exercise
    }
  },
  components: {
    VideoPlayer,
  }
}
</script>
<style>
</style>
