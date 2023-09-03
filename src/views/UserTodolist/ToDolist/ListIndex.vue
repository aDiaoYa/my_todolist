<template>
  <div class="listindex">
    <!-- todolist清单主界面 -->
    <h1>{{ userName }} 's ToDoList</h1>
    <ListHeader :receive="receive" :user="user"></ListHeader>
    <ul>
      <ListItem
        v-for="todoObj in forUserTodo()"
        :key="todoObj.id"
        :todo="todoObj"
        :checkTodo="checkTodo"
        :deleteTodo="deleteTodo"
        :forUserTodo="forUserTodo"
      ></ListItem>
    </ul>
    <ListFooter
      :todos="forUserTodo()"
      :checkAllTodo="checkAllTodo"
      :ClearAllTodos="ClearAllTodos"
    ></ListFooter>
  </div>
</template>

<script>
import ListHeader from "./ListHeader.vue";
import ListFooter from "./ListFooter.vue";
import ListItem from "./ListItem.vue";
// import { mapActions } from "vuex";

export default {
  name: "ListIndex",
  components: { ListHeader, ListItem, ListFooter },
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("user")) || [],
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  computed: {
    userName() {
      return this.user.username;
    },
  },
  methods: {
    receive(todoObj) {
      this.todos.unshift(todoObj);
    },
    checkTodo(todoid) {
      this.todos.forEach((todo) => {
        if (todo.id == todoid) {
          todo.done = !todo.done;
        }
      });
    },
    deleteTodo(todoid) {
      this.todos = this.todos.filter((todo) => todo.id !== todoid);
    },
    checkAllTodo(done) {
      this.todos.forEach((todo) => {
        todo.done = done;
      });
    },
    ClearAllTodos() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done;
      });
    },
    updateTodo(todoid, todotitle) {
      this.todos.forEach((todo) => {
        if (todo.id === todoid) {
          todo.title = todotitle;
        }
      });
    },
    // ...mapActions({ forUserTodo: "usertodo" }),
    forUserTodo() {
      let usertoo = this.todos.filter((todo) => todo.isUser === this.user.id);
      // this.$store.dispatch("usertodo", usertoo);
      return usertoo;
    },
  },
  watch: {
    todos: {
      deep: true,
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value));
      },
    },
  },
  mounted() {
    this.$bus.$on("updateTodo", this.updateTodo);
  },
  beforeDestroy() {
    this.$bus.$off("updateTodo");
  },
};
</script>
<style>
.listindex {
  width: 1050px;
  height: 670px;
}
h1 {
  margin-top: -30px;
  margin-bottom: 20px;
  text-align: center;
  color: #f199a4;
}
.listbox {
  width: 85%;
  height: 75px;
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
</style>