import Vue from 'vue'
import { DatePicker, TimePicker } from 'element-ui';
import MSchedule from 'mschedule'
import store from './store/index'

import App from './App.vue'

// 引入路由
import router from './router'
// 引入全局样式
import "../src/assets/css/common.css"
import "../src/assets/font/iconfont.css"
import "mschedule/dist/mschedule.css";

Vue.config.productionTip = false
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(MSchedule)

router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    let token = sessionStorage.getItem('user');
    if (token === null || token === '') {
      alert("请先登录哦！")
      next('/')
    } else {
      next()
    }
  }
  else {
    next();
  }
})
new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this  //安装全局事件总线
  },
  render: h => h(App),

}).$mount('#app')
