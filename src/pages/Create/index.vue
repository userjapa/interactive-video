<template>
<div class="container wrap align-items-start full-width">

  <VideoPlayer :video="video" ref="video-player"/>
  <Answers :answers="answers"/>
  <div class="item">
    <div class="option container column text-align-left">
      <label for="video_src">Video Source</label>
      <input class="input" id="video_src" type="text" v-model="video.src" @click="video.src = 'https://www.blogger.com/video-play.mp4?contentId=dabefc8f50ad941'">
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
          <input class="input margin-right-10" if="video_interruption_time" type="number" v-model="interruption.time" step="0.000001">
          <button class="btn" type="button" @click="getCurrentTime()">Get Current Time</button>
        </div>
      </div>
      <div class="container column text-align-left option">
        <label for="video_interruption_answer_text">Interruption Answers</label>
        <div class="container">
          <input class="input margin-right-10" id="video_interruption_answer_text" type="text" v-model="answer.text">
          <button @click.prevent="addAnswer(answer)">Add Answer</button>
        </div>
        <div class="container" v-for="(aswr, index) in interruption.answers">
          <input class="input margin-right-10" type="text" v-model="aswr.text">
          <input type="radio" name="correct" @change="correctChange(aswr)" :checked="aswr.correct">
          <label :for="`video_interruption_answer_correct_${index}`">Correct</label>
          <button @click.prevent="removeAnswer(index)">Remove</button>
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
import VideoPlayer from '../../components/VideoPlayer'
import Answers from '../../components/Answers'

import answerBus from '../../components/Answers/bus'

export default {
  name: "Create",
  data() {
    return {
      interruption: {
        message: '',
        pause: false,
        time: 0,
        answers: []
      },
      answer: {
        text: '',
        correct: false
      },
      answers: []
    }
  },
  methods: {
    addInterruption (interruption) {
      let hasCorrectAnswer = false
      for (const answr of interruption.answers) if (answr.correct) hasCorrectAnswer = true
      if (hasCorrectAnswer) {
        this.$store.commit('addInterruption', interruption)
        this.interruption = {
          message: '',
          pause: false,
          time: 0,
          answers: []
        }
      } else {
        alert('Must set the correct answer!')
      }
    },
    getCurrentTime () {
      this.interruption.time = this.$refs['video-player'].getCurrentTime()
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
        time: 0,
        answers: []
      }
    },
    removeInterruption (index) {
      this.$store.commit('remove', index)
    },
    addAnswer (answer) {
      this.interruption.answers.push(answer)
      this.answer = {
        text: '',
        correct: false
      }
    },
    removeAnswer (index) {
      this.interruption.answers.splice(index, 1)
    },
    correctChange (answer) {
      this.interruption.answers.map(x => {
        if (x.text === answer.text) x.correct = true
        else x.correct = false
      })
    },
    setAnswers (answers) {
      this.answers = answers
    }
  },
  computed: {
    video () {
      return this.$store.getters['getVideo']
    }
  },
  components: {
    VideoPlayer,
    Answers
  },
  mounted () {
    answerBus.$on('setAnswers', this.setAnswers)
  },
  beforeDestroy() {
    answerBus.$off('setAnswers', this.setAnswers)
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
