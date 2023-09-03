<template>
  <div class="register-form">
    <!-- 用户注册主界面 -->
    <!-- 标题盒子 -->
    <div class="title-box">
      <h1>注册</h1>
    </div>
    <!-- 输入框盒子 -->
    <div class="input-box">
      <input type="text" placeholder="用户名" v-model="user.username" />
      <input type="password" placeholder="密码" v-model="user.userpassword" />
      <input
        type="password"
        placeholder="确认密码"
        v-model="user.usercheckword"
      />
    </div>
    <p class="error" :style="errorStyle">{{ errorMessage }}</p>
    <!-- 按钮盒子 -->
    <div class="btn-box">
      <button type="primary" @click="submitForm()">注册</button>
      <!-- 绑定点击事件 -->
      <p @click="mySwitch()">已有账号?去登录</p>
    </div>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
import { nanoid } from "nanoid";
export default {
  name: "UserRegister",
  props: ["receive"],
  inject: ["reload"], //引用父组件传过来的reload方法进行页面刷新
  data() {
    return {
      user: {
        username: "",
        userpassword: "",
        usercheckword: "",
      },
      errorMessage: "",
      errorStyle: {
        textAlign: "center",
        color: "rgb(202, 43, 43)",
      },
      users: JSON.parse(localStorage.getItem("users")),
    };
  },
  methods: {
    // 向用户登录注册滑动页面发送订阅的消息——已有账号?去登录
    mySwitch() {
      console.log("去登陆");
      pubsub.publish("gologin", "preleftMove");
      // 实现页面强制刷新
      setTimeout(() => {
        this.reload();
      }, 500);
    },
    submitForm() {
      // 判断输入的内容是否为空
      if (
        this.user.username != "" &&
        this.user.userpassword != "" &&
        this.user.usercheckword != ""
      ) {
        let flag = true;
        // 判断本地存储里是否有用户存在
        if (this.users != null) {
          for (let user of this.users) {
            // 判断用户名是否重复
            if (user.username === this.user.username) {
              this.errorMessage = "用户名重复！";
              flag = false;
              break;
            }
          }
        }
        // 如果用户名重复，强制刷新组件
        if (!flag) {
          setTimeout(() => {
            this.reload();
          }, 1000);
        }
        // 如果用户名不重复，进行密码验证
        if (flag) {
          if (this.user.userpassword != this.user.usercheckword) {
            // 判断两次输入的密码是否正确
            this.errorMessage = "两次输入密码不一致! 请确认密码！";
            this.user.usercheckword = "";
          } else {
            this.errorMessage = "";
            // 将该用户打包成对象
            const userObj = {
              id: nanoid(),
              username: this.user.username,
              userpassword: this.user.userpassword,
            };
            // 传递给父组件进行本地存储
            this.receive(userObj);
            this.errorStyle.color = "rgb(29, 143, 8)";
            this.errorMessage = "注册成功！去登录叭！";
            // 强制刷新组件
            setTimeout(() => {
              this.reload();
            }, 1000);
          }
        }
        flag = true;
      } else {
        this.errorMessage = "输入信息不能为空！";
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>