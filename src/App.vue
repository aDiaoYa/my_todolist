<template>
  <div id="app">
    <keep-alive :include="['LoginRegister']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  margin: 0;
}
</style>
