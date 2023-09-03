<template>
  <div>
    <div class="listbox">
      <!-- todolist清单头部 -->
      <input
        type="text"
        placeholder="请输入你的任务名称，按回车键确认"
        @keyup.enter="addlist"
      />
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "ListHeader",
  props: ["receive", "user"],
  methods: {
    addlist(event) {
      if (event.target.value != "") {
        // 将用户的输入包装成一个todolist对象
        const todoObj = {
          id: nanoid(),
          title: event.target.value,
          done: false,
          isUser: this.user.id,
        };
        console.log(todoObj);
        this.receive(todoObj);
        event.target.value = "";
      } else {
        alert("输入不能为空！");
      }
    },
  },
};
</script>
<style scoped>

input:focus {
  outline: none;
  border-color: rgba(162, 207, 241, 0.8);
  box-shadow: inset 0 0.5px 0.5px rgba(238, 238, 238, 0.075),
    0 0 8px rgba(255, 255, 255, 0.6);
}
</style>