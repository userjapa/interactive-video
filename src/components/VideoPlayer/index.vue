<template>
<div class="full-width">

  <div class="relative video-relative">
    <video ref="video" class="screen full-width" :src="exercise.src" @playing="isPlaying = true" @pause="isPlaying = false" @loadeddata="loadedData($event.target)" @timeupdate="showInterruptions($event.target)" />
    <Answers :question="question" />
  </div>

  <div class="player container column align-center">
    <div class=" container align-center full-width">
      <div class="btns">
        <button class="btn" @click="play()" v-if="!isPlaying" :disabled="!loaded">Play</button>
        <button class="btn" @click="pause()" v-if="isPlaying" :disabled="!loaded">Pause</button>
      </div>
      <div class="current-time flex-grow-1">
        <input class="full" type="range" v-model="time.current" :max="duration" @change="changeTime(time.current)" @input="changeTime(time.current)">
      </div>
      <div class="volume">
        <input type="range" v-model="volume" step="0.001" @change="changeVolume(volume)" @input="changeVolume(volume)" max="1">
      </div>
    </div>
  </div>

</div>
</template>
<script>
import answerBus from '../Answers/bus'
import Answers from '../../components/Answers'

export default {
  name: "VideoPlayer",
  components: {
    Answers
  },
  data() {
    return {
      question: {},
      duration: 0,
      volume: 1,
      isPlaying: false,
      loaded: false,
      interruption: null,
      time: {
        old: 0,
        current: 0
      },
      index: 0,
      ended: false
    }
  },
  methods: {
    setCurrent (questions) {
      let qst = {}
      for (const index in questions) {
        this.index = index
        if (!questions[index].answered) qst = questions[index]
        else if (index == (questions.length - 1)) {
          qst = questions[index]
          this.ended = true
        }
      }
      this.$set(this, 'question', qst)
    },
    play() {
      this.setCurrent(this.exercise.questions)
      this.$refs['video'].play()
    },
    pause() {
      this.$refs['video'].pause()
    },
    loadedData(video) {
      this.duration = video.duration
      this.loaded = true
      this.first = true
      // video.play()
    },
    showInterruptions(video) {
      this.time.old = this.time.current
      this.time.current = video.currentTime
      if (this.question.time) {
        if (this.question.time >= this.time.old && this.question.time <= this.time.current) {
          answerBus.$emit('setMessage')
          video.pause()
        }
      }
    },
    changeTime(time) {
      this.$refs['video'].currentTime = time
    },
    changeVolume(volume) {
      this.$refs['video'].volume = volume
    },
    getCurrentTime() {
      const { currentTime } = this.$refs['video']
      return currentTime
    }
  },
  props: [
    'exercise'
  ],
  watch: {
    'exercise.src': function() {
      this.loaded = false
      this.duration = 0
      this.$refs['video'].load()
    }
  },
  mounted() {
    answerBus.$on('play', this.play)
    this.setCurrent(this.exercise.questions)
  },
  beforeDestroy() {
    answerBus.$off('play', this.play)
  }
}
</script>
<style lang="scss" scoped>
.video-relative {
    border-radius: 4px;
    overflow: hidden;
}
</style>
