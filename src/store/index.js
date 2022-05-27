import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let minute = 30;
export default new Vuex.Store({
  state: {
    drinkInfo: {
      open: true,
      interval: minute,
    },
    countDown: minute * 60,
  },
  mutations: {
    changeDinkInfo(state, info) {
      state.drinkInfo = Object.assign({}, state.drinkInfo, info);
      setTimeout(() => {
        browser.runtime.sendMessage({type: 'resetDrink', info: state.drinkInfo});
      }, 1000);
    },
    changeCountDown(state, num) {
      state.countDown = num;
      console.log('changeCountDown', state)
    }
  },
  actions: {
  },
  modules: {
  }
})
