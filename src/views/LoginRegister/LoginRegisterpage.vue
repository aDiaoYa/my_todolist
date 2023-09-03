<template>
  <transition
    :name="animate"
    enter-active-class="animate__swing"
    :appear="true"
  >
    <div class="pre-box" :style="preleft">
      <!-- =======用户登录注册滑动界面======= -->
      <h1>WELCOME</h1>
      <p>JOIN US!</p>
      <div class="img-box">
        <img :src="imgurl" alt="" />
      </div>
    </div>
  </transition>
</template>


<script>
import pubsub from "pubsub-js";
import "animate.css";
export default {
  name: "LoginRegisterpage",
  data() {
    return {
      animate: "animate__animated animate__bounce",
      // animate: "",
      preleft: {
        left: "0%",
        backgroundColor: "#edd4dc",
      },
      imgurl: "/waoku.jpg",
    };
  },
  mounted() {
    // 接收 用户登录主界面 发送过来的消息，判断是否滑动窗口
    this.pubId1 = pubsub.subscribe("goregister", this.preboxmove);
    // 接收 用户注册主界面 发送过来的消息，判断是否滑动窗口
    this.pubId2 = pubsub.subscribe("gologin", this.preboxmove);
  },
  methods: {
    // 滑动窗口动画（改变样式）
    preboxmove(_, data) {
      this.animate = data;
      console.log(this.animate);
      if (this.animate === "prerightMove") {
        this.preleft.left = "50%";
        this.preleft.backgroundColor = "#c9e0ed";
        this.imgurl = "/wuwu.jpeg";
      } else if (this.animate === "preleftMove") {
        this.preleft.left = "0%";
        this.preleft.backgroundColor = "#edd4dc";
        this.imgurl = "/waoku.jpg";
      }
    },
  },
  beforeDestroy() {
    // 取消订阅
    pubsub.unsubscribe(this.pubId1);
    pubsub.unsubscribe(this.pubId2);
  },
};
</script>


<style scoped>
/* 滑动的盒子 */
.pre-box {
  /* 宽度为大盒子的一半 */
  width: 50%;
  /* width: var(--width); */
  height: 100%;
  /* 绝对定位 */
  position: absolute;
  /* 距离大盒子左侧为0 */
  left: 0;
  /* 距离大盒子顶部为0 */
  top: 0;
  z-index: 99;
  border-radius: 4px;
  background-color: #edd4dc;
  box-shadow: 2px 1px 19px rgba(0, 0, 0, 0.1);
  /* 动画过渡，先加速再减速 */
  transition: all 0.5s ease-in-out;
}

/* 滑动盒子的标题 */
.pre-box h1 {
  margin-top: 150px;
  text-align: center;
  /* 文字间距 */
  letter-spacing: 5px;
  color: white;
  /* 禁止选中 */
  user-select: none;
  /* 文字阴影 */
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 滑动盒子的文字 */
.pre-box p {
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 20px 0;
  /* 禁止选中 */
  user-select: none;
  font-weight: bold;
  color: white;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 图片盒子 */
.img-box {
  width: 200px;
  height: 200px;
  margin: 20px auto;
  /* 设置为圆形 */
  border-radius: 50%;
  /* 设置用户禁止选中 */
  user-select: none;
  overflow: hidden;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 图片 */
.img-box img {
  width: 100%;
  transition: 0.5s;
}
</style>