export default {
  state() {
    return {
      userInfo: {}
    }
  },
  mutations: {
    login(state, param) {
      state.userInfo = param
    },
    logout(state){
      state.userInfo = {}
    }
  }
}









