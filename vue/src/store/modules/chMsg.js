import {get} from '../../utils/request'

const state = {
  message: 'Not meant to be displayed'
}

const getters = {}

const mutations = {
  setMessage (state, message) {
    state.message = message
  }
}

const actions = {
  initMessage ({commit}) {
    commit('setMessage', 'Press below button to get training results')
  },

  async getNewMessage ({commit}) {
    let result = await get('/api/files')
    commit('setMessage', result.data)
    console.log(result)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}