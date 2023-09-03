<template>
  <div>
    <div class="mycenter">
      <!-- 个人中心 -->
      <div class="header">
        <img src="/头像.jpg" alt="" class="touxiang" />
        <span class="yonghuming">{{ user.username }}</span>
        <p class="usertype">普通用户</p>
      </div>
      <div class="line"></div>
      <div class="list">
        <div>
          <h2>{{ todolength }}</h2>
          <span>创建日程</span>
        </div>
        <div>
          <h2>{{ donetodos }}</h2>
          <span>已完成</span>
        </div>
        <div @click="exit">
          <h2>退出</h2>
        </div>
      </div>
    </div>
    <br /><br />
    <div class="word">
      <h2 class="today">今日推送</h2>
      <div class="tsbox" @click="addServe()">
        <h3 class="tuisong">{{ $store.state.wordTuisong.message }}</h3>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "MyCenter",
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("user")),
    };
  },
  methods: {
    // 退出
    exit() {
      window.sessionStorage.clear();
      window.location.reload();
    },
    // 获取今日推送
    addServe() {
      this.$store.dispatch("wordTuisong/addServe");
    },
  },
  computed: {
    // ...mapState(["user"]),
    // username() {
    //   return this.user.username;
    // },
    ...mapState(["todos"]),
    todolength() {
      return this.todos.filter((todo) => todo.isUser === this.user.id).length;
    },
    donetodos() {
      return this.todos
        .filter((todo) => todo.isUser === this.user.id)
        .reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0);
    },
    isChecked: {
      get() {
        return this.donetodos === this.todos.length && this.todos.length > 0;
      },
      set(value) {
        this.checkAllTodo(value);
      },
    },
  },
};
</script>

<style scoped>
.mycenter,
.word {
  width: 900px;
  height: 100%;
  position: relative;
  top: -60px;
  margin: auto;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 2px 1px 19px rgb(0 0 0 / 10%);
}
.header {
  display: flex;
}
.yonghuming {
  float: left;
  font-size: 30px;
  font-weight: bold;
  color: #0c0c0c;
  margin: 65px 0;
  margin-right: -60px;
}
.touxiang {
  float: left;
  width: 10%;
  height: 10%;
  border-radius: 50%;
  border: 2px solid #f199a4;
  margin: 50px;
}
.usertype {
  margin-top: 115px;
  margin-left: 0px;
}
.line {
  width: 800px;
  height: 1px;
  border: 1px solid #40b681;
}
.list {
  display: flex;
  height: 100px;
}
h2 {
  cursor: pointer;
  text-align: center;
}
.today {
  margin: 40px 0;
}
.tsbox {
  cursor: pointer;
  margin: 20px auto;
  width: 90%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid white;
}
.tuisong {
  text-align: center;
  line-height: 50px;
}
</style>