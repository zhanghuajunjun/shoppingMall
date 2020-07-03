import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categorys: [],
    citya: localStorage.city || '',
    userInfos: {},
    length: ''
  },
  mutations: {
    setCategorys(state, data) {
      state.categorys = data
    },
    setCitya(state, data) {
      state.citya = data
    },
    setUserInfos(state, data) {
      state.userInfos = data
    },
    setLength(state, data) {
      state.length = data
    }, 
  },
  actions: {
  },
  modules: {
  }
})
