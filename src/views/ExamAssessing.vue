<template>
  <div class="exam-assessing">
    <div class="exam-assessing-line">
      <span>{{ curIndex + 1 }}</span>
      /{{ subjects.length }}
      <div v-if="!isAnalysis" class="exam-assessing-line-time">
        {{ countDownText }}
      </div>
      <div v-else class="exam-assessing-line-time">
        <div
          v-if="subject.stda === subject.zqda"
          class="exam-assessing-line-time-item"
        >
          <van-icon
            color="green"
            name="passed"
            style="margin-right: 5px"
          />答对了
        </div>
        <div v-else class="exam-assessing-line-time-item">
          <van-icon color="red" name="close" style="margin-right: 5px" />答错了
        </div>
      </div>
    </div>
    <van-progress :percentage="percentage" :show-pivot="false" />
    <div class="exam-assessing-content">
      <div class="exam-assessing-title">
        <van-tag style="margin-right: 10px" color="#f2826a" plain>
          {{ title }}
        </van-tag>
        {{ subject.stmc }}（{{ subject.stfs }}分）
      </div>
      <div class="exam-assessing-input">
        <van-radio-group
          v-if="subject.stlx === '01' || subject.stlx === '03'"
          v-model="ansers[curIndex]"
          :disabled="isAnalysis"
        >
          <van-radio
            class="exam-assessing-input-radio"
            v-for="item in subject.questionOptions"
            :name="item.xxdm"
            :key="item.xxid"
          >
            {{ item.xxms }}
            <div
              :class="`custom-option-icon ${props.checked ? 'active' : ''}`"
              slot="icon"
              slot-scope="props"
            >
              {{ item.xxdm }}
            </div>
          </van-radio>
        </van-radio-group>
        <van-checkbox-group
          v-if="subject.stlx === '02'"
          v-model="ansers[curIndex]"
        >
          <van-checkbox
            class="exam-assessing-input-checkbox"
            v-for="item in subject.questionOptions"
            :name="item.xxdm"
            :key="item.xxid"
            :disabled="isAnalysis"
          >
            {{ item.xxms }}
            <div
              :class="`custom-option-icon ${props.checked ? 'active' : ''}`"
              slot="icon"
              slot-scope="props"
            >
              {{ item.xxdm }}
            </div>
          </van-checkbox>
        </van-checkbox-group>
        <div v-if="subject.stlx === '04'" class="exam-assessing-input-input">
          <div v-for="(item, i) in subject.questionOptions" :key="item.xxid">
            <div class="exam-assessing-input-input-title">{{ item.xxms }}</div>
            <input :disabled="isAnalysis" v-model="ansers[curIndex][i]" />
          </div>
        </div>
        <div v-if="subject.stlx === '05'" class="exam-assessing-input-textarea">
          <textarea
            :disabled="isAnalysis"
            cols="30"
            rows="10"
            v-model="ansers[curIndex]"
          ></textarea>
        </div>
      </div>
      <div v-if="isAnalysis">
        <h4>答案解析</h4>
        <p style="color: #333">{{ subject.dajx }}</p>
      </div>
    </div>
    <div class="exam-assessing-btns">
      <van-button :disabled="curIndex === 0" @click="last">上一题</van-button>
      <van-button @click="showCard">答题卡</van-button>
      <van-button type="info" @click="next">
        {{ curIndex === subjects.length - 1 ? "交卷" : "下一题" }}
      </van-button>
    </div>
    <van-popup
      :style="{ height: '75%' }"
      position="bottom"
      v-model="showCardVisible"
    >
      <p class="exam-assessing-question-card-h4">答题卡</p>
      <div class="exam-assessing-question-card-tip">
        <div>
          <div class="exam-assessing-question-card-circle active"></div>
          已答
        </div>
        <div>
          <div class="exam-assessing-question-card-circle"></div>
          未答
        </div>
      </div>
      <div class="exam-assessing-question-card-result">
        <div
          v-for="(item, index) in ansers"
          :key="index"
          :class="{ 'exam-assessing-question-card-item': true, done: !!item }"
          @click="goto(index)"
        >
          {{ index + 1 }}
        </div>
      </div>
      <div class="exam-assessing-question-card-btns">
        <div class="border" @click="closeCard">继续答题</div>
        <div @click="endExam">交卷</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
// @ is an alias to /src
import { createNamespacedHelpers } from "vuex";
import moment from "moment";
import {
  Button,
  Tag,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  Progress,
  Dialog,
  Popup,
  Icon
} from "vant";

const { mapActions, mapState } = createNamespacedHelpers("examAssessing");

export default {
  name: "exam-assessing",
  data() {
    return {
      curIndex: 0,
      showCardVisible: false,
      countDownText: "",
      isAnalysis: false
    };
  },
  components: {
    "van-button": Button,
    "van-tag": Tag,
    "van-radio-group": RadioGroup,
    "van-radio": Radio,
    "van-checkbox-group": CheckboxGroup,
    "van-checkbox": Checkbox,
    "van-progress": Progress,
    "van-popup": Popup,
    "van-icon": Icon
  },
  async created() {
    const { id, index, is_analysis } = this.$route.query;
    await this.getDetail({
      ksid: id
    });
    this.countDownTimer = setInterval(this.creatCountDown, 1000);
    this.curIndex = index === undefined ? 0 : +index;
    this.isAnalysis = is_analysis === "1" ? true : false;
  },
  destroyed() {
    clearInterval(this.countDownTimer);
  },
  computed: {
    subject() {
      return this.subjects[this.curIndex] || {};
    },
    title() {
      const subjectTypeMap = {
        "01": "单选题",
        "02": "多选题",
        "03": "判断题",
        "04": "填空题",
        "05": "问答题"
      };
      return subjectTypeMap[this.subject.stlx];
    },
    percentage() {
      return ((this.curIndex + 1) / (this.subjects.length || 1)) * 100;
    },
    subjects() {
      return this.detail.questions || [];
    },
    ...mapState(["detail", "loading", "ansers"])
  },
  watch: {
    $route: "onRoute"
  },
  methods: {
    async next() {
      if (!this.isAnalysis) {
        await this.submitAnswerAction();
      }
      if (this.curIndex === this.subjects.length - 1) {
        if (this.isAnalysis) {
          return this.$router.push({
            path: "/exam-assess-result",
            query: {
              id: this.detail.ksid
            }
          });
        }
        Dialog.confirm({
          title: "交卷提示",
          message: "试卷提交后不可更改，确认要提交吗？",
          beforeClose: async (action, done) => {
            if (action === "confirm") {
              await this.endExamAndToResult();
              done();
            } else {
              done();
            }
          }
        });
      } else {
        // 填空题单独处理
        this.curIndex++;
        this.gotoPageByIndex(this.curIndex);
      }
    },
    last() {
      this.curIndex--;
      this.gotoPageByIndex(this.curIndex);
    },
    showCard() {
      this.showCardVisible = true;
    },
    closeCard() {
      this.showCardVisible = false;
    },
    endExam() {
      this.submitAnswerAction();
    },
    goto(index) {
      this.showCardVisible = false;
      this.curIndex = index;
      this.gotoPageByIndex(index);
    },
    onRoute() {
      this.getDetail({
        ksid: this.$route.query.id
      });
    },
    gotoPageByIndex(index) {
      this.$router.push({
        path: "/exam-assessing",
        query: {
          id: this.$route.query.id,
          index,
          is_analysis: this.$route.query.is_analysis
        }
      });
    },
    creatCountDown() {
      const endTime = moment(this.detail.jzsj);
      const startTime = moment();
      const diff = endTime.diff(startTime);
      const diffDuration = moment.duration(diff);
      if (diff <= 0) {
        this.countDownText = "00:00:00";
      } else {
        this.countDownText = `${this.formatTime(
          diffDuration.asHours()
        )}:${this.formatTime(diffDuration.asMinutes()) % 60}:${this.formatTime(
          diffDuration.asSeconds()
        ) % 60}`;
      }
    },
    formatTime(time) {
      const a = parseInt(time, 10);
      return Number(a).length === 1 ? `0${a}` : a;
    },
    async submitAnswerAction() {
      const stda = this.ansers[this.curIndex];
      if (stda) {
        await this.submitAnswer({
          ksid: this.detail.ksid,
          stid: this.subject.stid,
          stda: Array.isArray(stda) ? stda.join(";") : stda
        });
      }
    },
    async endExamAndToResult() {
      await this.updateExamStatus({
        ksid: this.detail.ksid,
        kszt: "03"
      });
      // 跳转
      this.$router.push({
        path: "/exam-assess-result",
        query: {
          id: this.detail.ksid
        }
      });
    },
    ...mapActions(["getDetail", "submitAnswer", "updateExamStatus"])
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
}
.exam-assessing-line span {
  color: rgb(25, 137, 250);
}
.exam-assessing-line-time {
  position: absolute;
  right: 15px;
  top: 15px;
  line-height: 1em;
  display: flex;
  align-items: center;
}
.exam-assessing-line-time-item {
  display: flex;
  align-items: center;
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
.exam-assessing-input .exam-assessing-input-checkbox {
  font-size: 14px;
  padding: 7px 0;
}
.exam-assessing-input .custom-option-icon.active {
  color: #1989fa;
  border-color: #1989fa;
}
.exam-assessing-input-input input {
  border: 1px solid #ccc;
  width: 100%;
  line-height: 30px;
}
.exam-assessing-input-input-title {
  font-size: 14px;
  color: #666;
  padding: 10px 0 5px;
}
.exam-assessing-input-textarea textarea {
  border: 1px solid #ccc;
  width: 100%;
}
.exam-assessing-question-card-h4 {
  text-align: center;
  border-bottom: 1px solid #ddd;
  margin: 0;
  padding: 10px 0;
}
.exam-assessing-question-card-tip {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
.exam-assessing-question-card-tip > div {
  display: flex;
  align-items: center;
  padding: 0 10px;
}
.exam-assessing-question-card-circle {
  width: 17px;
  height: 17px;
  border-radius: 50%;
  margin-right: 5px;
  background: #999;
}
.exam-assessing-question-card-circle.active {
  background: #1989fa;
}
.exam-assessing-question-card-result {
  overflow: auto;
}
.exam-assessing-question-card-item {
  float: left;
  width: 30px;
  line-height: 30px;
  height: 30px;
  border-radius: 50%;
  background: #999;
  text-align: center;
  margin-left: 20px;
}
.exam-assessing-question-card-item.done {
  background: #1989fa;
}
.exam-assessing-question-card-btns {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.exam-assessing-question-card-btns > div {
  width: 50%;
  float: left;
  line-height: 50px;
  text-align: center;
  border-top: 1px solid #eee;
}
.exam-assessing-question-card-btns > div.border {
  box-sizing: border-box;
  border-right: 1px solid #eee;
}
</style>
