import Vue from 'vue'
import Vuex from 'vuex'

import chMsg from './modules/chMsg'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    chMsg
  },
  strict: process.env.NODE_ENV !== 'production'
})
