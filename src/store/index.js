import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categorys: [],
    citya: '',
    userInfos: {},
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
  },
  actions: {
  },
  modules: {
  }
})
