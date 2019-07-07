<template>
  <div class="exam-assess-result">
    <div class="wrap">
      <img
        class="avatar"
        src="https://img.52z.com/upload/news/image/20181108/20181108204521_83402.jpg"
        alt="头像"
      />
      <span class="result">考试未通过</span>
      <div class="name">洪金宝</div>
      <div class="exam-type">试用</div>
      <div class="row">
        <div class="item">
          <span class="item-result">1/5</span>
          <span class="item-title">答对</span>
        </div>
        <div class="item">
          <span class="item-result">10</span>
          <span class="item-title">得分</span>
        </div>
        <div class="item">
          <span class="item-result">10</span>
          <span class="item-title">用时</span>
        </div>
      </div>
    </div>
    <div class="exam-card">
      <p>答题卡</p>
      <div class="exam-card-item">1</div>
      <div class="exam-card-item">2</div>
    </div>
    <div class="btns">
      <van-button
        class="left"
        size="large"
        type="info"
        @click="gotoSubjectAnalysis"
        >查看结果</van-button
      >
      <van-button
        class="right"
        size="large"
        plain
        hairline
        type="info"
        @click="gotoExam"
        >再次考试</van-button
      >
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { createNamespacedHelpers } from "vuex";
import { Button } from "vant";

const { mapActions, mapState } = createNamespacedHelpers("examAssess");

export default {
  name: "exam-assess-result",
  components: {
    "van-button": Button
  },
  created() {
    this.getList();
  },
  computed: {
    ...mapState(["list", "loading", "finished"])
  },
  methods: {
    gotoSubjectAnalysis() {
      this.$router.push({
        path: "/exam-assessing",
        query: {
          id: this.$route.query.id,
          index: 0,
          is_analysis: 1
        }
      });
    },
    gotoExam() {
      this.$router.push({
        path: "/exam-assessing",
        query: {
          id: this.$route.query.id,
          index: 0
        }
      });
    },
    onLoad() {},
    ...mapActions(["getList"])
  }
};
</script>
<style lang="less" scoped>
.exam-assess-result {
  position: relative;
}
.wrap {
  background-color: #07c160;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0 30px;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #6ca6d07a;
    padding: 5px;
  }
  .name {
    margin-top: 30px;
  }
  .row {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 30px;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .item-title {
        color: #999;
      }
    }
  }
}
.exam-card {
  overflow: auto;
  padding: 0 15px;
}
.exam-card p {
  text-align: center;
}
.exam-card-item {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: blue;
  color: #fff;
  text-align: center;
  line-height: 40px;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
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
