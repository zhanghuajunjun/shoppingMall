import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categorys: [],
    citya: '',
    userInfos: {},
    year: '',
    month: '',
    day: ''
  },
  mutations: {
    setCategorys(state,data) {
      state.categorys = data
    },
    setCitya(state,data) {
      state.citya = data
    },
    setUserInfos(state,data) {
      state.userInfos = data
    },
    setYear(state,data) {
      state.year = data
    },
    setMonth(state,data) {
      state.month = data
    },
    setDay(state,data) {
      state.day = data
    },
  },
  actions: {
  },
  modules: {
  }
})
