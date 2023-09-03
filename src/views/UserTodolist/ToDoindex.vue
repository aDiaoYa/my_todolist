<template>
  <div>
    <div class="breadcrumb">
      <img src="/向左.png" alt="" class="arrows" @click="back" />
      <span class="breadaddress">{{ bread }}</span>
      <img src="/向右.png" alt="" class="arrows" @click="forward" />
    </div>
    <!-- 侧边导航栏 -->
    <div class="menu-box">
      <div class="emotion-box">
        <i id="emotion1" class="iconfont icon-wukongbiaoqing"></i>
        <i id="emotion2" class="iconfont icon-chenggongbiaoqing"></i>
      </div>
      <ul>
        <li>
          <router-link active-class="active" to="/todolist">
            <i class="iconfont icon-shouye"></i>
            <p class="content">首页</p>
          </router-link>
        </li>
        <li>
          <router-link to="/todolist/schedule">
            <i class="iconfont icon-jilu"></i>
            <p class="content">日程</p>
          </router-link>
        </li>

        <li>
          <router-link to="/todolist/mycenter">
            <i class="iconfont icon-wode"></i>
            <p class="content">我的</p>
          </router-link>
        </li>
      </ul>
    </div>
    <keep-alive include="ListIndex">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: "ToDoindex",
  components: {},
  data() {
    return {
      bread: "",
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    forward() {
      this.$router.forward();
    },
  },
  mounted() {
    return (this.bread = this.$route.meta.title);
  },
  watch: {
    $route(to) {
      return (this.bread = to.meta.title);
    },
  },
};
</script>

<style scoped>
.breadcrumb {
  position: fixed;
  top: 410px;
  left: 15px;
  height: 30px;
}
.breadaddress {
  color: #40b681;
  font-weight: bold;
  line-height: 30px;
}
.arrows {
  width: 25px;
}
.iconfont {
  font-size: 26px !important;
  color: #fff;
  line-height: 50px;
  text-align: center;
}

.menu-box {
  position: fixed;
  top: 140px;
  left: 20px;
  width: 60px;
  height: 250px;
  background-color: #f199a4;
  border-radius: 30px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  /* 添加过渡 */
  transition: all 0.2s ease-out;
  overflow: hidden;
}

.menu-box:hover {
  width: 120px;
  border-radius: 60px;
}

/* hover时让文字出现 */
.menu-box:hover > ul > li p {
  display: block;
}

/* 表情盒子 */
.emotion-box {
  width: 100%;
  text-align: center;
  margin: 10px auto;
}

#emotion1,
#emotion2 {
  color: #fff;
  font-size: 32px !important;
  animation: jitter 0.3s linear forwards;
}

#emotion2 {
  display: none;
}

.menu-box:hover #emotion1 {
  display: none;
}

.menu-box:hover #emotion2 {
  display: block;
}

ul {
  width: 100%;
  height: 75%;
}

li {
  list-style: none;
}

li > a {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
  text-decoration: none;
  /* 禁止用户选中 */
  user-select: none;
}

li:hover {
  background-color: #e2848f;
  cursor: pointer;
}

li:hover .content,
li:hover i {
  color: #fff;
}

li:hover i {
  animation: jitter 0.3s linear forwards;
}

.content {
  display: none;
  padding-left: 5px;
  color: #fff;
  /* 设置文字不换行 */
  white-space: nowrap;
  transition: all 0.2s ease-out;
}

/* 抖动动画 */
@keyframes jitter {
  0% {
    /* 缩放1.2倍，顺时针旋转10° */
    transform: scale(1.2) rotate(10deg);
  }

  50% {
    transform: scale(0.8) rotate(-10deg);
  }

  0% {
    transform: scale(1) rotate(0deg);
  }
}
</style>