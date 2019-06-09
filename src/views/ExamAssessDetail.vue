<template>
  <div class="exam-assess-detail">
    <h2>常识考试（试用）</h2>
    <van-row class="items">
      <van-col class="item" span="12">
        <img class="item-icon" :src="totalScoreImgUrl" alt="" />
        <div class="item-content">
          <span class="item-content-num">100</span>
          <span class="item-content-title">总分数</span>
        </div>
      </van-col>
      <van-col class="item" span="12">
        <img class="item-icon" :src="passLineImgUrl" alt="" />
        <div class="item-content">
          <span class="item-content-num">100</span>
          <span class="item-content-title">总分数</span>
        </div>
      </van-col>
      <van-col class="item" span="12">
        <img class="item-icon" :src="examCountImgUrl" alt="" />
        <div class="item-content">
          <span class="item-content-num">100</span>
          <span class="item-content-title">总分数</span>
        </div>
      </van-col>
      <van-col class="item" span="12">
        <img class="item-icon" :src="examTimeLongImgUrl" alt="" />
        <div class="item-content">
          <span class="item-content-num">100</span>
          <span class="item-content-title">总分数</span>
        </div>
      </van-col>
    </van-row>
    <div class="exam-date">
      考试时间
      <span>05~29 14：26 至 --</span>
    </div>
    <div class="exam-times">
      可考次数
      <span>无限制</span>
    </div>
    <p class="desc">
      为期考试测评应用提供完善的考试评测四通，致辞自建题库，系统只能出卷，定向组织考试，题目乱序，外部考试，自动改卷。
    </p>
    <div class="btns">
      <van-button class="left" size="large" plain hairline type="info"
        >查看结果</van-button
      >
      <van-button class="right" size="large" type="info">考试</van-button>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { createNamespacedHelpers } from "vuex";
import { Row, Col, Button } from "vant";
import totalScoreImgUrl from "../assets/images/exam-assess-detail-zongfenshu.png";
import passLineImgUrl from "../assets/images/exam-assess-detail-jigexian.png";
import examCountImgUrl from "../assets/images/exam-assess-detail-tishu.png";
import examTimeLongImgUrl from "../assets/images/exam-assess-detail-shichang.png";

const { mapActions, mapState } = createNamespacedHelpers("examAssess");

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
    this.getList();
  },
  computed: {
    ...mapState(["list", "loading", "finished"])
  },
  methods: {
    onLoad() {},
    ...mapActions(["getList"])
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
