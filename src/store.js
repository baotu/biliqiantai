import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    headerBg:{},
    user:{},
  },
  mutations: {
    setheaderBg:function(state,value){
      state.headerBg = value;
    },
    setuser:(state,value) => {
      state.user = value;
    }
  },
  actions: {

  }
})
