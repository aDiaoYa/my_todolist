import axios from 'axios'
export default {
  namespaced: true,
  actions: {
    addServe(context) {
      axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
        response => {
          context.commit('AddServe', response.data)
        },
        error => {
          alert(error.message)
        }
      )
    }
  },
  mutations: {
    AddServe(state, value) {
      state.message = value
    }
  },
  state: {
    message: '点击我，获取今日推送！'
  }
}