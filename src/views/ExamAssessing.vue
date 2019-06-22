<template>
  <div class="exam-assessing">
    <div class="exam-assessing-line">
      1/5
      <div class="exam-assessing-line-time">12:30:09</div>
    </div>
    <div class="exam-assessing-content">
      <div class="exam-assessing-title">
        <van-tag style="margin-right: 10px" color="#f2826a" plain
          >单选题</van-tag
        >3*6=18 这个计算式是否正确？（10分）
      </div>
      <div class="exam-assessing-input">
        <van-radio-group v-model="radio">
          <van-radio
            class="exam-assessing-input-radio"
            v-for="item in subject"
            :name="item.option"
            :key="item.option"
          >
            {{ item.title }}
            <div
              :class="`custom-option-icon ${props.checked ? 'active' : ''}`"
              slot="icon"
              slot-scope="props"
            >
              {{ item.option }}
            </div>
          </van-radio>
        </van-radio-group>
      </div>
    </div>
    <div class="exam-assessing-btns">
      <van-button disabled>上一题</van-button>
      <van-button>答题卡</van-button>
      <van-button type="info">下一题</van-button>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { createNamespacedHelpers } from "vuex";
import { Button, Tag, RadioGroup, Radio } from "vant";

const { mapActions, mapState } = createNamespacedHelpers("examAssess");

export default {
  name: "exam-assessing",
  data() {
    return {
      radio: "A",
      subject: [
        { title: "昨天是几点", option: "A" },
        { title: "今天是几点", option: "B" },
        { title: "明天是几点", option: "C" },
        { title: "到底是几点", option: "D" }
      ]
    };
  },
  components: {
    "van-button": Button,
    "van-tag": Tag,
    "van-radio-group": RadioGroup,
    "van-radio": Radio
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
.exam-assessing-content {
  padding: 20px;
}
.exam-assessing-input {
  padding: 15px 0;
}
.exam-assessing-input .van-radio {
  padding: 7px 0;
}
.exam-assessing-input .custom-option-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #999;
  text-align: center;
  font-size: 14px;
  line-height: 18px;
  color: #999;
  transition: all 0.2s;
}
.exam-assessing-input .exam-assessing-input-radio {
  font-size: 14px;
}
.exam-assessing-input .custom-option-icon.active {
  color: #1989fa;
  border-color: #1989fa;
}
</style>
