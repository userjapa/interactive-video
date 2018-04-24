<template>
  <div class="item">
    <div>
      {{ message }}
    </div>
    <div>
      <video ref="video" class="screen" :src="video.src" @playing="isPlaying = true" @pause="isPlaying = false" @loadeddata="loadedData($event.target)" @timeupdate="showInterruptions($event.target)" />
    </div>

    <div class="player container align-center">
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
</template>
<script>
import answerBus from '../Answers/bus'

export default {
  name: "VideoPlayer",
  data() {
    return {
      duration: 0,
      volume: 1,
      isPlaying: false,
      loaded: false,
      message: '',
      time: {
        old: 0,
        current: 0
      }
    }
  },
  methods: {
    play() {
      this.$refs['video'].play()
    },
    pause() {
      this.$refs['video'].pause()
    },
    loadedData(video) {
      this.duration = video.duration
      this.loaded = true
      video.play()
    },
    showInterruptions(video) {
      this.time.old = this.time.current
      this.time.current = video.currentTime
      const index = this.video.interruptions.findIndex(x => (x.time >= this.time.old && x.time <= this.time.current))
      if (index >= 0) {
        answerBus.$emit('setAnswers', this.video.interruptions[index].answers)
        this.message = this.video.interruptions[index].message
        if (this.video.interruptions[index].pause) video.pause()
      }
    },
    changeTime(time) {
      this.message = ''
      this.$refs['video'].currentTime = time
    },
    changeVolume(volume) {
      this.$refs['video'].volume = volume
    },
    getCurrentTime () {
      const { currentTime } = this.$refs['video']
      return currentTime
    }
  },
  props: [
    'video'
  ],
  watch: {
    'video.src': function() {
      this.loaded = false
      this.duration = 0
      this.$refs['video'].load()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
