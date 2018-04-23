import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)

export default new VueX.Store({
  state: {
    video: {
      src: null,
      interruptions: [],
      messages: []
    }
  },
  mutations: {
    setVideo (state, video) {
      state.video = video
    }
  },
  getters: {
    getVideo ({ video }) {
      return video
    }
  }
})
