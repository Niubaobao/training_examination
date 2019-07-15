<template>
  <div class="wrap exam_record">
    <div
      class="qwui-lean_exam exam_content"
      v-for="item in listArr"
      :key="item.sjid"
    >
      <div class="data_bar">
        {{ formatTimeTitle(item.kssj) }} {{ getWeekByDate(item.kssj) }}
      </div>
      <div>
        <div class="qwui-lean_examItem_record exam_item">
          <div class="exam_name">{{ item.ksmc }}</div>
          <div class="qwui-flexbox">
            <div class="qwui-flexItem exam_info">
              <p class="exam_time">
                <van-icon name="clock-o" />
                <span class="desc">
                  {{ formatTime(item.gxsj) }}
                  <span style="margin-left: 3px">交卷</span>
                </span>
              </p>
              <p class="exam_duration">考试时长：{{ item.ksxs }}</p>
            </div>
            <div class="exam_pass_state exam_pass_big">
              <div class="exam_pass_container qwui-flexbox exam_pass_big">
                <div class="exam_pass_desc">
                  {{ item.sftg === "01" ? "通过" : "未通过" }}
                </div>
              </div>
            </div>
          </div>
          <div class="exam_explain">{{ item.kssm }}</div>
          <div class="clearfix">
            <div class="exam_button" @click="startExam(item.ksid)">
              再次考试
            </div>
            <div
              class="exam_button exam_button_answer"
              @click="goResault(item.ksid)"
            >
              查看结果
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="empty" v-if="listArr.length === 0">暂无考试记录</div>
  </div>
</template>

<script>
import { Icon } from "vant";
import { getExamList, resetExam } from "@/api/index.js";
import moment from "moment";
export default {
  name: "examination-history",
  data() {
    return {
      listArr: []
    };
  },
  components: {
    "van-icon": Icon
  },
  mounted() {
    this.getExamList();
  },
  methods: {
    formatTime(value) {
      return moment(value).format("MM-DD HH:mm");
    },
    async startExam(id) {
      await resetExam({
        ksid: id,
        userid: "110"
      });
      this.$router.push({
        path: "/exam-assessing",
        query: { id: id }
      });
    },
    goResault(id) {
      this.$router.push({
        path: "/exam-assess-result",
        query: {
          id: id
        }
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
    async getExamList() {
      const params = {
        userid: "110",
        pageIndex: 1,
        pageSize: 10,
        kszt: "03"
      };
      const { status, data } = await getExamList(params);
      console.log(status, data.data.Items);
      if (status !== 200) return;
      this.listArr = data.data.Items;
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  position: relative;
  overflow: hidden;
  min-width: 266px;
  .empty {
    text-align: center;
    padding-top: 30%;
  }
  p {
    margin: 0;
  }
  .qwui-lean_exam {
    margin-bottom: 10px;
    padding: 25px 0 0 15px;
    background: #fff;
    box-sizing: border-box;
  }
  .data_bar {
    height: 19px;
    color: #888;
    font-size: 20px;
    line-height: 19px;
  }
  .qwui-lean_examItem_record {
    position: relative;
    padding: 20px 15px 14px 0;
    box-sizing: border-box;
  }
  .exam_name {
    color: #333;
    font-size: 17px;
    line-height: normal;
    vertical-align: middle;
  }
  .qwui-flexbox {
    display: flex;
    .exam_info {
      font-size: 14px;
      line-height: 14px;
      color: #999;
    }
    .qwui-flexItem {
      flex: 1;
      .exam_time {
        margin-top: 10px;
        display: flex;
        .desc {
          margin-left: 6px;
        }
      }
      .exam_duration {
        margin: 6px 0;
      }
    }
    .exam_pass_big {
      font-size: 32px;
    }
    .exam_pass_state {
      position: relative;
      width: 56px;
      height: 56px;
      font-weight: 500;
      text-align: center;
      background: #fff;
      border: 2px solid #999;
      border-radius: 50%;
      transform: rotate(-15deg);
      .exam_pass_container {
        position: absolute;
        top: -21px;
        left: -21px;
        flex-wrap: wrap;
        -webkit-box-align: center;
        align-items: center;
        justify-content: center;
        width: 96px;
        height: 96px;
        border: 1px solid #999;
        border-radius: 50%;
        transform: scale(0.5);
      }
      .exam_pass_desc {
        margin-bottom: 0;
        color: #555555;
      }
    }
  }
  .exam_explain {
    word-break: break-word;
    margin-bottom: 18px;
    font-size: 14px;
    color: #333;
  }
  .clearfix {
    height: 32px;
    .exam_button {
      float: right;
      display: inline-block;
      margin-left: 10px;
      width: 81px;
      height: 30px;
      font-size: 13px;
      line-height: 30px;
      color: #2f7dcd;
      text-align: center;
      border: 1px solid #2f7dcd;
      border-radius: 3px;
      cursor: default;
    }
    .exam_button_answer {
      color: #666;
      border-color: #666;
    }
  }
}
</style>
