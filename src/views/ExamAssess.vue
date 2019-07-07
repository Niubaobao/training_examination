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
            <span class="tag">{{ item.kszt }}</span>
            <div>{{ item.ksmc }}</div>
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
              @click.stop="gotoContinueExam(item.ksid)"
              >考试</van-button
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
      return moment(date).format("hh:mm");
    },
    gotoExamDetail(id) {
      this.$router.push({
        path: "/exam-assess-detail",
        query: { id }
      });
    },
    gotoContinueExam(id) {
      this.$router.push({
        path: "/exam-assessing",
        query: { id }
      });
    },
    ...mapActions(["getList"])
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
