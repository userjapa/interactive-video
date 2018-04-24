import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)

export default new VueX.Store({
  state: {
    video: {
      src: null,
      interruptions: []
    },
    toUpdate: null
  },
  mutations: {
    setVideo (state, video) {
      state.video = video
    },
    addInterruption ({ video }, interruption) {
      video.interruptions.push(interruption)
    },
    setToUpdate (state, id) {
      state.toUpdate = id
    },
    edit (state, interruption) {
      const id = state.toUpdate
      state.video.interruptions[id] = interruption
    },
    remove (state, id) {
      state.video.interruptions.splice(id, 1)
    }
  },
  getters: {
    getVideo ({ video }) {
      return video
    },
    isToUpdate ({ toUpdate }) {
      if (toUpdate !== null) return true
      else return false
    }
  }
})
