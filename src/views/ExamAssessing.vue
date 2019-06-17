<template>
  <div class="exam-assessing">
    <div class="exam-assessing-line">
      1/5
      <div class="exam-assessing-line-time">12:30:09</div>
    </div>
    <div class="exam-assessing-content">
      <div class="exam-assessing-title"></div>
      <div class="exam-assessing-input"></div>
    </div>
    <div class="exam-assessing-btns">
      <van-button disabled>上一题</van-button>
      <van-button>答题卡</van-button>
      <van-button type="primary">下一题</van-button>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { createNamespacedHelpers } from "vuex";
import { Button } from "vant";

const { mapActions, mapState } = createNamespacedHelpers("examAssess");

export default {
  name: "exam-assessing",
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
    onLoad() {},
    ...mapActions(["getList"])
  }
};
</script>
<style lang="less" scoped>
.exam-assessing {
  display: flex;
  flex-direction: column;
  background: #fff;
}
.exam-assessing-line {
  text-align: center;
  position: relative;
  padding: 15px;
  border-bottom: 1px solid #ddd;
}
.exam-assessing-line-time {
  position: absolute;
  right: 15px;
  top: 15px;
  line-height: 1em;
}
.exam-assessing-btns {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.exam-assessing-btns button {
  width: 33.3%;
}
</style>
