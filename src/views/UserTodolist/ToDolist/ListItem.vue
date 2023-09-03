<template>
  <li class="listbox">
    <div class="checkbox">
      <label for="checkAll">
        <input
          class="allist"
          type="checkbox"
          id="checkAll"
          :checked="todo.done"
          @click="handlerCheck(todo.id)"
        />
        <span v-show="!todo.isEdit">{{ todo.title }}</span>
        <input
          type="text"
          v-show="todo.isEdit"
          @blur="handleUpdate(todo, $event)"
          @keyup.enter="handleUpdate(todo, $event)"
          ref="inputTitle"
        />
      </label>
    </div>
    <button class="btn btn-danger" @click="handlerDelete(todo.id)">删除</button>
    <button
      class="btn btn-edit"
      @click="handlerEdit(todo)"
      v-show="!todo.isEdit"
    >
      编辑
    </button>
    <el-date-picker
      v-model="value"
      @blur="handlerTime(todo)"
      type="datetime"
      placeholder="选择日期时间"
    >
    </el-date-picker>
  </li>
</template>

<script>
export default {
  name: "ListItem",
  props: ["todo", "checkTodo", "deleteTodo"],
  data() {
    return {
      value: "",
    };
  },
  methods: {
    handlerCheck(id) {
      this.checkTodo(id);
    },
    handlerDelete(id) {
      this.deleteTodo(id);
    },
    handlerEdit(todo) {
      if (todo.isEdit != undefined) {
        todo.isEdit = true;
      } else {
        this.$set(todo, "isEdit", true);
      }
      this.$nextTick(function () {
        this.$refs.inputTitle.focus();
      });
    },
    handleUpdate(todo, event) {
      todo.isEdit = false;
      if (!event.target.value.trim()) return alert("输入不能为空");
      this.$bus.$emit("updateTodo", todo.id, event.target.value);
    },
    getCurrentTime(valuetime) {
      //获取当前时间并打印
      let yy = valuetime.getFullYear();
      let mm = valuetime.getMonth() + 1;
      let dd = valuetime.getDate();
      let hh = valuetime.getHours();
      let mf = valuetime.getMinutes();
      let ss = valuetime.getSeconds();
      const currentime = new Date();
      const getDifference =
        (yy - currentime.getFullYear()) * 365 * 24 * 60 * 60 +
        (mm - (currentime.getMonth() + 1)) * 30 * 24 * 60 * 60 +
        (dd - currentime.getDate()) * 24 * 60 * 60 +
        (hh - currentime.getHours()) * 60 * 60 +
        (mf - currentime.getMinutes()) * 60 +
        (ss - currentime.getSeconds());
      console.log("getDifference" + getDifference);
      return getDifference;
    },
    handlerTime(todo) {
      if (todo.time != undefined) {
        todo.time = this.value;
      } else {
        this.$set(todo, "time", this.value);
      }
      if (this.getCurrentTime(this.value) < 0) {
        alert("少年，过去的时间已经一去不复返啦~");
        this.value = "";
        todo.time = "";
      } else {
        setTimeout(() => {
          alert("滴滴滴！" + todo.title + "时间到啦！");
          this.value = "";
          todo.time = "";
        }, this.getCurrentTime(this.value) * 1000);
      }
    },
  },
  mounted() {
    this.value = this.todo.time;
  },
};
</script>

<style>
.el-picker-panel__body-wrapper .el-time-panel__btn {
  width: 75px;
}
.el-date-editor .el-input__inner {
  width: 82%;
  padding-left: 0px;
  color: #f199a4;
}
.el-date-editor .el-input__prefix .el-input__icon:before {
  margin-right: -220px;
  color: #f199a4;
}
.el-date-picker .el-picker-panel__icon-btn {
  width: 40px;
  margin-left: 0px;
}
.el-date-picker .el-picker-panel__link-btn {
  margin-left: 0px;
  margin-right: 30px;
}
</style>
<style scoped>
li {
  overflow: hidden;
  width: 85%;
  list-style: none;
  margin: 0 auto;
}
.checkbox {
  float: left;
  width: 66%;
}
.allist {
  width: 2%;
  height: 100%;
  margin: 30px 48px;
}
span {
  margin-left: 0px;
}
.btn {
  display: inline;
  margin: 22px 22px;
}
</style>