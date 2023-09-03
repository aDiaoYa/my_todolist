<template>
  <div class="listbox">
    <div class="checkbox">
      <label for="checkAll" />
      <input class="allist" type="checkbox" id="checkAll" v-model="isChecked" />
    </div>
    <span>
      <span
        >已完成{{ donetodos }}/<span>全部{{ todos.length }}</span></span
      >
    </span>

    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "ListFooter",
  props: ["todos", "checkAllTodo", "ClearAllTodos"],
  data() {
    return {};
  },
  computed: {
    donetodos() {
      return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0);
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
  methods: {
    clearAll() {
      this.ClearAllTodos();
    },
  },
};
</script>

<style scoped>
.checkbox {
  margin: 20px 50px;
}
.allist {
  width: 100%;
  height: 100%;
}
span {
  margin-left: 0px;
}
.btn {
  width: 130px;
  margin: 22px 80px;
}
</style>