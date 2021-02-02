import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import actions from '@/store/actions'
import getters from '@/store/getters'
import mutations from '@/store/mutations'
import state from '@/store/state'

import createPersistedState from "vuex-persistedstate"

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})


export default store;
