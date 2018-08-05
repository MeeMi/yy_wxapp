import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  items:[] // 购物车商品
}

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})