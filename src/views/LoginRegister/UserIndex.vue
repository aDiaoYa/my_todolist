<template>
  <div class="box">
    <!-- ====== 用户登录注册主界面 ====== -->
    <LoginRegisterpage></LoginRegisterpage>
    <UserRegister v-if="isRefresh" :receive="receive"></UserRegister>
    <UserLogin v-if="isRefresh" :users="users"></UserLogin>
  </div>
</template>

<script>
import LoginRegisterpage from "./LoginRegisterpage";
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister";

export default {
  name: "UserIndex",
  // 父组件中返回要传给下级的数据
  provide() {
    return {
      reload: this.reload,
    };
  },
  components: {
    LoginRegisterpage,
    UserLogin,
    UserRegister,
  },
  // 读取存入的用户数据
  data() {
    return {
      users: JSON.parse(localStorage.getItem("users")) || [],
      isRefresh: true,
    };
  },
  methods: {
    // 组件刷新
    reload() {
      this.isRefresh = false;
      this.$nextTick(() => {
        this.isRefresh = true;
      });
    },
    // 注册后，添加用户
    receive(userObj) {
      this.users.unshift(userObj);
    },
  },
  // 监测是否注册了用户
  watch: {
    users: {
      deep: true,
      handler(value) {
        localStorage.setItem("users", JSON.stringify(value));
      },
    },
  },
};
</script>

<style>
/* 最外层的大盒子 */
.box {
  width: 1050px;
  height: 600px;
  display: flex;
  /* 相对定位 */
  position: relative;
  z-index: 2;
  margin: auto;
  /* 设置圆角 */
  border-radius: 8px;
  /* 设置边框 */
  border: 1px solid rgba(255, 255, 255, 0.6);
  /* 设置盒子阴影 */
  box-shadow: 2px 1px 19px rgba(0, 0, 0, 0.1);
}
/* 注册盒子 */
.login-form,
.register-form {
  flex: 1;
  height: 100%;
}

/* 标题盒子 */
.title-box {
  margin-top: -80px;
  height: 300px;
  line-height: 500px;
}

/* 标题 */
.title-box h1 {
  text-align: center;
  color: white;
  /* 禁止选中 */
  user-select: none;
  letter-spacing: 5px;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 输入框盒子 */
.input-box {
  display: flex;
  /* 纵向布局 */
  flex-direction: column;
  /* 水平居中 */
  align-items: center;
}

/* 输入框 */
input {
  width: 60%;
  height: 40px;
  margin-bottom: 20px;
  text-indent: 10px;
  border: 1px solid #fff;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 120px;
  /* 增加磨砂质感 */
  backdrop-filter: blur(10px);
}

input:focus {
  /* 光标颜色 */
  color: #b0cfe9;
}

/* 聚焦时隐藏文字 */
input:focus::placeholder {
  opacity: 0;
}

/* 按钮盒子 */
.btn-box {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* 按钮 */
button {
  width: 100px;
  height: 30px;
  /* margin: 0 7px; */
  margin-left: 140px;
  line-height: 30px;
  border: none;
  border-radius: 4px;
  background-color: #69b3f0;
  color: white;
}

/* 按钮悬停时 */
button:hover {
  /* 鼠标小手 */
  cursor: pointer;
  /* 透明度 */
  opacity: 0.8;
}

/* 按钮文字 */
.btn-box p {
  height: 30px;
  line-height: 30px;
  margin-right: 145px;
  /* 禁止选中 */
  user-select: none;
  font-size: 14px;
  color: white;
}

.btn-box p:hover {
  cursor: pointer;
  border-bottom: 1px solid white;
}
</style>