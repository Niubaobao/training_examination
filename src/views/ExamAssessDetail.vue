<template>
  <div class="exam-assess-detail">
    <h2>{{ detail.ksmc }}</h2>
    <van-row class="items">
      <van-col class="item" span="12">
        <img class="item-icon" :src="totalScoreImgUrl" alt />
        <div class="item-content">
          <span class="item-content-num">{{ detail.kszf }}</span>
          <span class="item-content-title">考试总分</span>
        </div>
      </van-col>
      <van-col class="item" span="12">
        <img class="item-icon" :src="passLineImgUrl" alt />
        <div class="item-content">
          <span class="item-content-num">{{ detail.tgfs }}</span>
          <span class="item-content-title">及格分</span>
        </div>
      </van-col>
      <van-col class="item" span="12">
        <img class="item-icon" :src="examCountImgUrl" alt />
        <div class="item-content">
          <span class="item-content-num">{{ detail.stsl }}</span>
          <span class="item-content-title">总题数</span>
        </div>
      </van-col>
      <van-col class="item" span="12">
        <img class="item-icon" :src="examTimeLongImgUrl" alt />
        <div class="item-content">
          <span class="item-content-num">{{ detail.ksxs }}</span>
          <span class="item-content-title">考试时长</span>
        </div>
      </van-col>
    </van-row>
    <div class="exam-date">
      考试时间
      <span
        >{{ formatDate(detail.kssj) }} 至 {{ formatDate(detail.jzsj) }}</span
      >
    </div>
    <div class="exam-times">
      可考次数
      <span>{{ detail.kscs }}</span>
    </div>
    <p class="desc">{{ detail.kssm }}</p>
    <div class="btns">
      <van-button
        v-if="detail.kszt !== '01'"
        class="left"
        size="large"
        plain
        hairline
        type="info"
        @click="gotoExamResult"
        >查看结果</van-button
      >
      <van-button
        class="right"
        size="large"
        type="info"
        @click="gotoContinueExam"
        >考试</van-button
      >
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { createNamespacedHelpers } from "vuex";
import { Row, Col, Button } from "vant";
import moment from "moment";
import totalScoreImgUrl from "../assets/images/exam-assess-detail-zongfenshu.png";
import passLineImgUrl from "../assets/images/exam-assess-detail-jigexian.png";
import examCountImgUrl from "../assets/images/exam-assess-detail-tishu.png";
import examTimeLongImgUrl from "../assets/images/exam-assess-detail-shichang.png";

const { mapActions, mapState } = createNamespacedHelpers("examAssessDetail");

export default {
  name: "exam-assess-detail",
  data() {
    return {
      totalScoreImgUrl,
      passLineImgUrl,
      examCountImgUrl,
      examTimeLongImgUrl
    };
  },
  components: {
    "van-row": Row,
    "van-col": Col,
    "van-button": Button
  },
  created() {
    this.getDetail({
      ksid: this.$route.query.id,
      sfck: "02"
    });
  },
  computed: {
    ...mapState(["detail", "loading"])
  },
  methods: {
    formatDate(date) {
      return moment(date).format("MM-DD HH:mm");
    },
    gotoContinueExam() {
      this.$router.push({
        path: "/exam-assessing",
        query: { id: this.$route.query.id }
      });
    },
    gotoExamResult() {
      this.$router.push({
        path: "/exam-assess-result",
        query: {
          id: this.$route.query.id
        }
      });
    },
    ...mapActions(["getDetail"])
  }
};
</script>
<style lang="less" scoped>
.exam-assess-detail {
  padding: 15px;
  position: relative;
}
.items {
  border-bottom: 1px solid #ddd;
}
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
}
.item-icon {
  width: 40px;
  height: 40px;
  margin-right: 25px;
}
.item-content {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.item-content-title {
  color: #999;
  font-size: 12px;
}
.exam-date,
.exam-times {
  margin-top: 30px;
  color: #999;
  font-size: 14px;
}
.exam-date span,
.exam-times span {
  color: #333;
  margin-left: 10px;
}
.exam-times {
  margin-top: 10px;
}
.desc {
  margin-top: 40px;
}
.btns {
  display: flex;
  position: fixed;
  padding: 20px 15px;
  border-top: 1px solid #ddd;
  left: 0;
  right: 0;
  bottom: 10px;
}
.btns .left {
  margin-right: 5px;
}
.btns .right {
  margin-left: 5px;
}
</style>
