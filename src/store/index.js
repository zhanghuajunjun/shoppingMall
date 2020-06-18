import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    slides: [],
    category: [],
    recommend: [],

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
  },
  actions: {
  },
  modules: {
  }
})
