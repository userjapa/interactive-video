<template>
<div class="container wrap align-items-start full-width">

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

  <div class="item">
    <div class="option container column text-align-left">
      <label for="video_src">Video Source</label>
      <input class="input" id="video_src" type="text" v-model="video.src">
    </div>
    <form v-on:submit.prevent="addInterruption(interruption)">
      <div class="container column text-align-left option">
        <label for="video_interruption_message">Interruption Message</label>
        <input class="input" id="video_interruption_message" type="text" v-model="interruption.message">
      </div>
      <div class="container column text-align-left option">
        <label for="video_interruption_pause">Interruption Pause</label>
        <input class="input" id="video_interruption_pause" type="checkbox" v-model="interruption.pause">
      </div>
      <div class="container column text-align-left option">
        <label for="video_interruption_time">Interruption Time</label>
        <div class="container">
          <input class="input margin-right-10" type="number" v-model="interruption.time" step="0.000001">
          <button class="btn" type="button" @click="getCurrentTime()">Get Current Time</button>
        </div>
      </div>
      <div>
        <button class="btn btn-full" type="submit" name="submit" v-if="!$store.getters['isToUpdate']">Add Interruption</button>
        <button class="btn btn-full" type="button" name="edit" v-if="$store.getters['isToUpdate']" @click="updateInterruption(interruption)">Edit Interruption</button>
        <button class="btn btn-full" type="button" name="cancel" v-if="$store.getters['isToUpdate']" @click="cancelUpdate()">Cancel Edit</button>
      </div>
    </form>
  </div>
  <div class="b">
    <div>
      <h3>Video</h3>
    </div>
    <div>
      Source: {{ video.src }}
    </div>
    <div>
      <div>
        Interruptions:
      </div>
      <div class="b" v-for="(inpt, index) in video.interruptions">
        <div>
          Time: {{ inpt.time }}
        </div>
        <div>
          Stop: {{ inpt.pause?'Yes':'No' }}
        </div>
        <div>
          Message: {{ inpt.message }}
        </div>
        <div>
          <button @click="editInterruption(index)">Edit</button>
          <button @click="removeInterruption(index)">Remove</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "Create",
  data() {
    return {
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
    play() {
      this.$refs['video'].play()
    },
    pause() {
      this.$refs['video'].pause()
    },
    addInterruption (interruption) {
      this.$store.commit('addInterruption', interruption)
      this.interruption = {
        message: '',
        pause: false,
        time: 0
      }
    },
    getCurrentTime () {
      const { currentTime } = this.$refs['video']
      this.interruption.time = currentTime
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
    editInterruption (index) {
      this.$store.commit('setToUpdate', index)
      this.interruption = Object.assign({}, this.video.interruptions[index])
    },
    updateInterruption (interruption) {
      this.$store.commit('edit', interruption)
      this.cancelUpdate()
    },
    cancelUpdate () {
      this.$store.commit('setToUpdate', null)
      this.interruption = {
        message: '',
        pause: false,
        time: 0
      }
    },
    removeInterruption (index) {
      this.$store.commit('remove', index)
    }
  },
  computed: {
    video () {
      return this.$store.getters['getVideo']
    }
  },
  watch: {
    'video.src': function() {
      this.loaded = false
      this.duration = 0
      this.$refs['video'].load()
    }
  }
}
</script>
<style lang="scss">
.screen {
    width: 100%;
    height: auto;
    min-height: 315px;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
}
.option {
    width: 100%;
    margin-bottom: 20px;
}
.player {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
    .btns {}
    .current-time {
        margin: 0 10px;
    }

    .volume {
        input[type=range] {
            width: 70px;
        }
    }
}

input[type=range].full {
    width: 100%;
}
</style>
