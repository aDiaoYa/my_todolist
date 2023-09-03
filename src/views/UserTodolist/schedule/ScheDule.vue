<template>
  <div id="calendar">
    <MSchedule
      :scheduleList="plan"
      :isExpend="false"
      :hasNumExpend="3"
      @handleDetail="handleDetail"
      @chooseEntireCard="chooseEntireCard"
    >
      <!-- @changeMonth="changeMonth" -->
      <template v-slot:card="{ row }">
        <span>日程：{{ row.course }}</span>
      </template>
    </MSchedule>
  </div>
</template>
<script>
export default {
  name: "ScheDule",
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("user")) || [],
      todos: JSON.parse(localStorage.getItem("todos")) || [],
      plan: [],
    };
  },
  methods: {
    /**
     * 获取当天时间
     * @returns {string}
     */
    getCurDay(todotime) {
      let num = 0;
      var datetime = new Date(todotime);
      var year = datetime.getFullYear();
      var month =
        datetime.getMonth() + 1 < 10
          ? "0" + (datetime.getMonth() + 1)
          : datetime.getMonth() + 1;
      let day = datetime.getDate();
      if (day + num > 0) {
        day =
          day + num < 10
            ? "0" + (datetime.getDate() + num)
            : datetime.getDate() + num;
      } else {
        day =
          day - num < 10
            ? "0" + (datetime.getDate() - num)
            : datetime.getDate() - num;
      }
      return `${year}-${month}-${day}`;
    },
    /**
     * 点击日程查看详情
     * @param row
     */
    handleDetail(row) {
      console.log(row);
    },
    /**
     * 切换周
     * @param date
     */
    changeWeek(date) {
      console.log(date);
    },
    /**
     * 点击日期查看数据
     * @param date
     */
    chooseEntireCard(row) {
      console.log(row);
    },
  },
  // 添加日程
  beforeMount() {
    this.todos = this.todos.filter((todo) => todo.isUser === this.user.id);
    this.todos.forEach((todo) => {
      const planObj = {
        date: this.getCurDay(todo.time),
        status: 3,
        course: todo.title,
      };
      this.plan.unshift(planObj);
    });
  },
  beforeDestroy() {},
};
</script>

<style>
#calendar {
  position: absolute;
  top: 30px;
  left: 280px;
}
.month-container .month-top .m-today-date {
  margin: 0 auto;
  font-size: 20px;
  font-weight: bold;
}
.m-card-status .square {
  background-color: #40b681;
}
.month-container .m-date-wrap .m-week {
  background-color: #40b681;
}
.month-container .m-date-wrap .m-day > li .m-card-default {
  background-color: #40b681;
  min-height: 20px;
}
.month-container .m-date-wrap .m-day > li .m-card-default span {
  font-size: 10px;
}
.month-container .month-top .m-card-status {
  display: none;
}
#calendar .month-container {
  border: 1px solid #40b681;
}
.month-container .m-date-wrap .m-day > li {
  border: 1px solid #40b681;
  margin: 0;
}
.month-container .m-date-wrap .m-day > li:nth-child(7n) {
  border-right: 1px solid #40b681;
}
.m-day .m-isCurToday {
  background: #40b681;
  color: #f199a4;
}
.m-day .m-isCurMonth {
  background: white;
  color: #40b681;
}
</style>