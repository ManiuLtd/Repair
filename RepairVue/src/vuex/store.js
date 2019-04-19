import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  user:''
}
const mutations = {
  LOGIN(state) {
    state.user=JSON.parse(window.localStorage.getItem('user'))
  }
}

const actions = {
  login(context) {
    context.commit('LOGIN')
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
