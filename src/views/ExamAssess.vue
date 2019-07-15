<template>
  <div class="exam-assess">
    <PageWithTab>
      <van-list
        :value.sync="loading"
        :finished="finished"
        @load="onLoad"
        finished-text="没有更多了"
      >
        <div
          class="item"
          v-for="item in list"
          :key="item.id"
          @click="gotoExamDetail(item.ksid)"
        >
          <div class="time">
            {{ formatTimeTitle(item.kssj) }} {{ getWeekByDate(item.kssj) }}
          </div>
          <div class="title">
            <span class="tag">{{ getTag(item.kszt) }}</span>
            <div>{{ item.ksmc }}</div>
          </div>
          <div class="end_time">
            开始时间：
            <img style="width: 18px" :src="clockImgUrl" />
            {{ getEndTime(item.kssj) }}
          </div>
          <div class="end_time">
            截止时间：
            <img style="width: 18px" :src="clockImgUrl" />
            {{ getEndTime(item.jzsj) }}
          </div>
          <div class="time_long">考试时长：{{ item.ksxs }}分钟</div>
          <div class="desc">{{ item.kssm }}</div>
          <div class="btn-wrap">
            <van-button
              class="btn"
              size="small"
              plain
              hairline
              type="danger"
              @click.stop="gotoContinueExam(item.ksid, item.kszt)"
              >{{ getBtnText(item.kszt) }}</van-button
            >
          </div>
        </div>
      </van-list>
    </PageWithTab>
  </div>
</template>
<script>
// @ is an alias to /src
import { createNamespacedHelpers } from "vuex";
import PageWithTab from "@/components/PageWithTab.vue";
import { List, Button } from "vant";
import moment from "moment";
import clockImgUrl from "../assets/images/clock.png";

const { mapActions, mapState } = createNamespacedHelpers("examAssess");

export default {
  name: "exam-assess",
  data() {
    return {
      clockImgUrl,
      pageIndex: 0
    };
  },
  components: {
    PageWithTab,
    "van-list": List,
    "van-button": Button
  },
  computed: {
    ...mapState(["list", "loading", "finished"])
  },
  methods: {
    onLoad() {
      this.getList({
        pageIndex: ++this.pageIndex,
        pageSize: 10
      });
    },
    formatTimeTitle(date) {
      return moment(date).format("MM月DD日");
    },
    getWeekByDate(date) {
      const weeks = ["日", "一", "二", "三", "四", "五", "六"];
      const index = new Date(date).getDay();
      return `星期${weeks[index]}`;
    },
    getEndTime(date) {
      return moment(date).format("YYYY/MM/DD HH:mm");
      // const d = new Date(date);
      // const zh = this.formatZhDate(d.getHours(), d.getMinutes());
      // return `${zh} ${d.getHours()}:${d.getMinutes()}`;
    },
    gotoExamDetail(id) {
      this.$router.push({
        path: "/exam-assess-detail",
        query: { id }
      });
    },
    async gotoContinueExam(id, kszt) {
      if (kszt === "03") {
        await this.resetExam({
          ksid: id
        });
      }
      this.$router.push({
        path: "/exam-assessing",
        query: { id }
      });
    },
    formatZhDate(hour, minute) {
      if (hour < 9) {
        return "早上";
      } else if (hour < 11 && minute < 30) {
        return "上午";
      } else if (hour < 13 && minute < 30) {
        return "中午";
      } else if (hour < 18) {
        return "下午";
      } else {
        return "晚上";
      }
    },
    getTag(key) {
      const tagMap = {
        "01": "未开始",
        "02": "考试中",
        "03": "交卷（考试结束）"
      };
      return tagMap[key];
    },
    getBtnText(key) {
      const tagMap = {
        "01": "开始考试",
        "02": "继续考试",
        "03": "重新考试"
      };
      return tagMap[key];
    },
    ...mapActions(["getList", "resetExam"])
  }
};
</script>
<style lang="less" scoped>
.exam-assess .item {
  display: flex;
  flex-direction: column;
  padding: 15px;
  background: #fff;
  margin-bottom: 4px;
  .time {
    font-size: 18px;
    color: #666;
    margin-bottom: 5px;
  }
  .title {
    display: flex;
    font-size: 16px;
    color: #333;
    margin-bottom: 7px;
    .tag {
      color: #fff;
      background-color: red;
      border-radius: 5px;
      font-size: 12px;
      padding: 2px;
      margin-right: 5px;
    }
  }
  .end_time,
  .time_long {
    font-size: 14px;
    color: #777;
    display: flex;
    align-items: center;
    padding: 2px 0;
  }
  .desc {
    margin-top: 7px;
    font-size: 14px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .btn-wrap {
    text-align: right;
    margin-top: 7px;
    .btn {
      width: 100px;
    }
  }
}
</style>
