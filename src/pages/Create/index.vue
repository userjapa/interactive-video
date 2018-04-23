<template>
  <div class="container">
    <div class="item">
      <video ref="video" class="screen b">
      </video>
    </div>
    <div class="item">
      <div class="screen b">
        <div class="option">
          <label for="video_src">Video Source</label>
          <input id="video_src" type="text" v-model="video.src">
        </div>
        <div class="option">
          <form v-on:submit.prevent="addInterruption(interruption)">
            <div>
              <label for="video_interruption_message">Interruption Message</label>
              <input id="video_interruption" type="text" v-model="interruption.message">
            </div>
            <div>
              <label for="video_interruption_pause">Interruption Pause</label>
              <input id="video_interruption_pause" type="checkbox" v-model="interruption.pause">
            </div>
            <div>
              <label for="video_interruption_time">Interruption Time</label>
              <input type="number" v-model="interruption.time">
              <button type="button">Get Current Time</button>
            </div>
            <div>
              <button type="submit" name="button">Add Interruption</button>
            </div>
          </form>
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
      video: {},
      interruption: {}
    }
  }
}
</script>
<style>
.screen {
  width: 75%;
  height: auto;
}
</style>
