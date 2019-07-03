<template>
  <div class="exam-assessing">
    <div class="exam-assessing-line">
      <span>{{ curIndex + 1 }}</span>
      /{{ subjects.length }}
      <div class="exam-assessing-line-time">12:30:09</div>
    </div>
    <van-progress :percentage="percentage" :show-pivot="false" />
    <div class="exam-assessing-content">
      <div class="exam-assessing-title">
        <van-tag style="margin-right: 10px" color="#f2826a" plain>
          {{ subject.stlxms }}
        </van-tag>
        {{ subject.stmc }}（{{ subject.stfs }}分）
      </div>
      <div class="exam-assessing-input">
        <van-radio-group
          v-if="subject.stlx === '01' || subject.stlx === '03'"
          v-model="radio"
        >
          <van-radio
            class="exam-assessing-input-radio"
            v-for="item in subject.questionOptions"
            :name="item.xxid"
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
        <van-checkbox-group v-if="subject.stlx === '02'" v-model="checkbox">
          <van-checkbox
            class="exam-assessing-input-checkbox"
            v-for="item in subject.questionOptions"
            :name="item.xxid"
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
          </van-checkbox>
        </van-checkbox-group>
        <div v-if="subject.stlx === '04'" class="exam-assessing-input-input">
          <div v-for="item in subject.options" :key="item.title">
            <div class="exam-assessing-input-input-title">{{ item.title }}</div>
            <Input v-model="item.value" />
          </div>
        </div>
        <div v-if="subject.stlx === '05'" class="exam-assessing-input-textarea">
          <textarea cols="30" rows="10" v-model="subject.value"></textarea>
        </div>
      </div>
    </div>
    <div class="exam-assessing-btns">
      <van-button :disabled="curIndex === 0" @click="last">上一题</van-button>
      <van-button>答题卡</van-button>
      <van-button
        :disabled="curIndex === subjects.length - 1"
        type="info"
        @click="next"
        >下一题</van-button
      >
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { createNamespacedHelpers } from "vuex";
import {
  Button,
  Tag,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  Progress
} from "vant";

const { mapActions, mapState } = createNamespacedHelpers("examAssessing");

export default {
  name: "exam-assessing",
  data() {
    return {
      radio: "A",
      checkbox: [],
      curIndex: 0
      // subjects: [
      //   {
      //     type: "radio",
      //     title: "昨天是几号？",
      //     score: 5,
      //     options: [
      //       { title: "昨天是几点", option: "A" },
      //       { title: "今天是几点", option: "B" },
      //       { title: "明天是几点", option: "C" },
      //       { title: "到底是几点", option: "D" }
      //     ]
      //   },
      //   {
      //     type: "muti",
      //     title: "一下哪几种是水果？",
      //     score: 5,
      //     options: [
      //       { title: "香蕉", option: "A" },
      //       { title: "苹果", option: "B" },
      //       { title: "黄瓜", option: "C" },
      //       { title: "西红柿", option: "D" }
      //     ]
      //   },
      //   {
      //     type: "input",
      //     title: "公司_点上班，__点下班？",
      //     score: 25,
      //     options: [{ title: "填空项1" }, { title: "填空项2" }]
      //   },
      //   {
      //     type: "textarea",
      //     title: "昨天航班怎么样？",
      //     score: 30,
      //     options: []
      //   }
      // ]
    };
  },
  components: {
    "van-button": Button,
    "van-tag": Tag,
    "van-radio-group": RadioGroup,
    "van-radio": Radio,
    "van-checkbox-group": CheckboxGroup,
    "van-checkbox": Checkbox,
    "van-progress": Progress
  },
  created() {
    this.getDetail({
      ksid: this.$route.query.id
    });
  },
  computed: {
    subject() {
      return this.subjects[this.curIndex];
    },
    title() {
      const subjectTypeMap = {
        radio: "单选题",
        muti: "多选题",
        input: "填空题",
        textarea: "简单题"
      };
      return subjectTypeMap[this.subject.type];
    },
    percentage() {
      return ((this.curIndex + 1) / this.subjects.length) * 100;
    },
    subjects() {
      return this.detail.questions;
    },
    ...mapState(["detail", "loading"])
  },
  methods: {
    next() {
      this.curIndex++;
    },
    last() {
      this.curIndex--;
    },
    onLoad() {},
    ...mapActions(["getDetail"])
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
</style>
