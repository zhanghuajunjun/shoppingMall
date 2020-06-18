import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    slides: [],
    category: [],
    recommend: [],
    floor1: [],

  },
  mutations: {
    setSlides(state,data) {
      state.slides = data
    },
    setCategory(state,data) {
      state.category = data
    },
    setRecommend(state,data) {
      state.recommend = data
    },
    setFloor1(state,data) {
      state.floor1 = data
    }
  },
  actions: {
  },
  modules: {
  }
})
