// 引入Vue核心文件
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
import wordOption from './wordOption';

Vue.use(Vuex)

const actions = {
  usertodo(context, n) {
    console.log(11111111);
    console.log(context);
    console.log(n);
    context.commit('userTodo', n)
  },
  userlogin(context, n) {
    context.commit('userLogin', n)
  }
}

const mutations = {
  userTodo(state, n) {
    state.todos = n

  },
  userLogin(state, n) {
    state.user = n
  }
}

const state = {
  user: JSON.parse(sessionStorage.getItem("user")) || [],
  todos: JSON.parse(localStorage.getItem("todos")) || [],
}

export default new Vuex.Store({
  actions,
  mutations,
  state,
  modules: {
    wordTuisong: wordOption
  }
})