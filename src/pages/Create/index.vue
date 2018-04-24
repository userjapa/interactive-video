<template>
  <div class="container">
    <div class="item">
      <div>
        {{ message }}
      </div>
      <div>
        <video
          ref="video"
          class="screen b"
          :src="video.src"
          @playing="isPlaying = true"
          @pause="isPlaying = false"
          @loadeddata="loadedData($event.target)"
          @timeupdate="showInterruptions($event.target)"
        />
      </div>
      <div>
        <input class="full" type="range" v-model="time.current" :max="duration" @change="changeTime(time.current)" @input="changeTime(time.current)">
      </div>
      <div>
        <input type="range" v-model="volume" step="0.001" @change="changeVolume(volume)" @input="changeVolume(volume)" max="1">
      </div>
      <div>
        <button @click="play()" v-if="!isPlaying" :disabled="!loaded">Play</button>
        <button @click="pause()" v-if="isPlaying" :disabled="!loaded">Pause</button>
      </div>
    </div>
    <div class="item">
      <div class="screen b">
        <div class="option">
          <label for="video_src">Video Source</label>
          <input id="video_src" type="text" v-model="video.src">
        </div>
        <div class="option b">
          <form v-on:submit.prevent="addInterruption(interruption)">
            <div>
              <label for="video_interruption_message">Interruption Message</label>
              <input id="video_interruption_message" type="text" v-model="interruption.message">
            </div>
            <div>
              <label for="video_interruption_pause">Interruption Pause</label>
              <input id="video_interruption_pause" type="checkbox" v-model="interruption.pause">
            </div>
            <div>
              <label for="video_interruption_time">Interruption Time</label>
              <input type="number" v-model="interruption.time" step="0.000001">
              <button type="button" @click="getCurrentTime()">Get Current Time</button>
            </div>
            <div>
              <button type="submit" name="button">Add Interruption</button>
            </div>
          </form>
        </div>
        <div>
          <button type="button" name="button" @click="save(video)">Save Configurations</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Create",
  data () {
    return {
      video: {
        src: null,
        interruptions: []
      },
      interruption: {
        message: '',
        pause: false,
        time: 0
      },
      isPlaying: false,
      loaded: false,
      time: {
        old: 0,
        current: 0
      },
      duration: 0,
      volume: 1,
      message: ''
    }
  },
  methods: {
    play () {
      this.$refs['video'].play()
    },
    pause () {
      this.$refs['video'].pause()
    },
    addInterruption (interruption) {
      this.video.interruptions.push(interruption)
      this.interruption = {
        message: '',
        pause: false,
        time: 0
      }
    },
    save (video) {
      console.log(video)
      this.$store.commit('setVideo', video)
    },
    getCurrentTime () {
      const { currentTime } = this.$refs['video']
      this.interruption.time = currentTime
    },
    loadedData (video) {
      this.duration = video.duration
      this.loaded = true
    },
    showInterruptions (video) {
      this.time.old = this.time.current
      this.time.current = video.currentTime
      const index = this.video.interruptions.findIndex(x => (x.time >= this.time.old && x.time <= this.time.current))
      if (index >= 0) {
        this.message = this.video.interruptions[index].message
        if (this.video.interruptions[index].pause) video.pause()
      }
    },
    changeTime (time) {
      this.message = ''
      this.$refs['video'].currentTime = time
    },
    changeVolume (volume) {
      this.$refs['video'].volume = volume
    }
  },
  watch: {
    'video.src': function () {
      this.loaded = false
      this.duration = 0
      this.$refs['video'].load()
    }
  }
}
</script>
<style>
.screen {
  width: 75%;
  height: auto;
}

input[type=range].full {
  width: 75%;
}
</style>
