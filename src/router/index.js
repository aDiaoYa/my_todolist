import Vue from 'vue'
// 引入路由器
import VueRouter from 'vue-router'
// import LoginRegister from '../views/LoginRegister/UserIndex'
import ToDoindex from '../views/UserTodolist/ToDoindex'
import ScheDule from "../views/UserTodolist/schedule/ScheDule"
import MyCenter from "../views/UserTodolist/mycenter/MyCenter"
import ListIndex from "../views/UserTodolist/ToDolist/ListIndex"
// 使用路由器
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginRegister',
    component: () => import('../views/LoginRegister/UserIndex')
  },
  {
    path: '/todolist',
    name: 'ToDoindex',
    component: ToDoindex,
    redirect: '/todolist',
    meta: {
      isAuth: true
    },

    children: [
      {
        path: '/todolist',
        name: 'ListIndex',
        component: ListIndex,
        meta: { isAuth: true, title: '首页' }
      },
      {
        path: 'schedule',
        name: 'ScheDule',
        component: ScheDule,
        meta: { isAuth: true, title: '日程' }
      },
      {
        path: 'mycenter',
        name: 'MyCenter',
        component: MyCenter,
        meta: { isAuth: true, title: '我的' }
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router;