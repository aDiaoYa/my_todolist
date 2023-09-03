<template>
  <div class="login-form">
    <!-- 用户登录主界面 -->
    <!-- 标题盒子 -->
    <div class="title-box">
      <h1>登录</h1>
    </div>
    <!-- 输入框盒子 -->
    <div class="input-box">
      <input type="text" placeholder="用户名" v-model="username" />
      <input type="password" placeholder="密码" v-model="userpassword" />
    </div>
    <p class="error" :style="errorStyle">{{ errorMessage }}</p>
    <!-- 按钮盒子 -->
    <div class="btn-box">
      <button @click="login">登录</button>
      <!-- 绑定点击事件 -->
      <p @click="mySwitch()">没有账号?去注册</p>
    </div>
  </div>
</template>

<script>
import pubsub from "pubsub-js";

export default {
  name: "UserLogin",
  props: ["users"],
  inject: ["reload"], //引用父组件传过来的reload方法进行页面刷新
  data() {
    return {
      username: "",
      userpassword: "",
      errorMessage: "",
      errorStyle: {
        textAlign: "center",
        color: "rgb(202, 43, 43)",
      },
    };
  },
  methods: {
    // 向用户登录注册滑动页面发送订阅的消息——没有账号，去注册
    mySwitch() {
      console.log("去注册");
      pubsub.publish("goregister", "prerightMove");
      // 实现页面强制刷新
      setTimeout(() => {
        this.reload();
      }, 500);
    },
    // 登录条件
    login() {
      for (let user of this.users) {
        if (this.username !== "" && this.userpassword !== "") {
          if (
            user.username === this.username &&
            user.userpassword === this.userpassword
          ) {
            console.log("登陆成功" + user);
            sessionStorage.setItem("user", JSON.stringify(user)),
              this.$router.push({
                name: "ToDoindex",
                params: {
                  username: this.username,
                },
              });
          } else {
            this.errorMessage = "用户名或密码错误，请重新输入！";
            // 实现页面强制刷新
            setTimeout(() => {
              this.reload();
            }, 1000);
          }
        } else {
          this.errorMessage = "用户名或密码不能为空！";
          setTimeout(() => {
            this.reload();
          }, 1000);
        }
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>