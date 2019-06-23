<template>
  <div class="contentWapper">
    <div class="header-wapper">
      <div class="item" :class="{ active: tab === 0 }" @click="changeTab(0)">
        学习中
      </div>
      <div class="item" :class="{ active: tab === 1 }" @click="changeTab(1)">
        已完成
      </div>
      <div class="bot-line" :class="address">
        <span class="bar-inner"></span>
      </div>
    </div>
    <!-- 学习中 -->
    <div v-if="tab === 0">
      <div class="courseList">
        <div
          class="qwui-learn_list_item clearfix"
          v-for="item in dataArr"
          :key="item.kcid"
        >
          <div class="item_img_wrap">
            <img :src="`http://dzjc.ruantechnology.com/${item.kcfm}`" alt="" />
          </div>
          <!-- 进度 -->
          <div class="item_rate">
            <div class="rate">
              <van-circle
                font-size="12px;"
                v-model="item.currentRate"
                :rate="item.xxjd * 100"
                :speed="100"
                size="45px"
                layer-color="#ebedf0"
                :text="formatDesc(item)"
              />
            </div>
            <div class="desc">已学习</div>
          </div>
          <p class="item_subjectName">
            {{ item.kcmc }}
          </p>
        </div>
      </div>
      <div class="qwui-showMoreList">
        <p>共 {{ dataArr.length || 0 }} 条</p>
      </div>
    </div>
    <!-- 已完成 -->
    <div v-if="tab === 1">
      <!--  -->
      <div v-if="dataArr.length">
        <div class="courseList">
          <div
            class="qwui-learn_list_item clearfix"
            v-for="item in dataArr"
            :key="item.kcid"
          >
            <div class="item_img_wrap">
              <img
                :src="`http://dzjc.ruantechnology.com/${item.kcfm}`"
                alt=""
              />
            </div>
            <!-- 进度 -->
            <div class="item_rate">
              <div class="rate">
                <van-circle
                  font-size="12px;"
                  v-model="item.currentRate"
                  :rate="item.xxjd * 100"
                  :speed="100"
                  size="45px"
                  layer-color="#ebedf0"
                  :text="text"
                />
              </div>
              <div class="desc">已学习</div>
            </div>
            <p class="item_subjectName">
              {{ item.kcmc }}
            </p>
          </div>
        </div>
        <div class="qwui-showMoreList">
          <p>共 {{ dataArr.length || 0 }} 条</p>
        </div>
      </div>

      <!-- 空记录 -->
      <div class="qwui-no_record_box" v-if="!dataArr.length">
        <div>
          <van-icon name="description" size="130px" color="#eeeeee" />
        </div>
        <p class="qwui-no_record_title">暂无学习记录</p>
        <p class="qwui-no_record_text">快去首页选课学习吧</p>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { Circle, Icon } from "vant";
import { GetUserRecentCourses } from "@/api/index.js";
export default {
  name: "learn-history",
  data() {
    return {
      tab: 0,
      currentRate: 0,
      dataArr: []
    };
  },
  computed: {
    address: function() {
      return this.tab === 0 ? "lf" : "rg";
    }
  },
  mounted() {
    this.GetUserRecentCourses(0);
  },
  components: {
    "van-circle": Circle,
    "van-icon": Icon
  },
  methods: {
    formatDesc(item) {
      return `${parseInt(item.xxjd * 100)}%`;
    },
    changeTab(value) {
      this.tab = value;
      this.GetUserRecentCourses(value);
    },
    async GetUserRecentCourses(value) {
      const params = {
        userid: "110",
        sfwc: value
      };
      const { status, data } = await GetUserRecentCourses(params);
      if (status !== 200) return;
      if (data.data.length === 0) {
        this.dataArr = [];
      } else {
        this.formatArr(data.data);
      }
    },
    formatArr(arr) {
      if (!arr.length) return;
      // const midArr = [];
      arr.map(item => {
        item.currentRate = 0;
      });
      this.dataArr = arr;
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .van-circle__text {
  font-size: 12px;
  color: #45a8f5;
  line-height: 12px;
}
.contentWapper {
  .header-wapper {
    display: flex;
    flex-direction: row;
    background: white;
    height: 44px;
    position: relative;
    border-bottom: 1px solid #eeeeee;
    width: 100%;
    .item {
      line-height: 44px;
      text-align: center;
      font-size: 14px;
      color: #666;
      flex: 1;
    }
    .active {
      color: #2f7dcd;
    }
    .bot-line {
      position: absolute;
      bottom: 0;
      display: block;
      height: 3px;
      background-color: transparent;
      .bar-inner {
        width: 70%;
        display: block;
        background-color: #2f7dcd;
        margin: auto;
        height: 100%;
      }
    }
    .lf {
      left: 0%;
      right: 50%;
    }
    .rg {
      left: 50%;
      right: 0%;
    }
  }
  .courseList {
    padding-top: 10px;
    background: #fff;
    box-sizing: border-box;
    .qwui-learn_list_item {
      position: relative;
      // height: 64px;
      padding: 12px 15px;
      box-sizing: border-box;
    }
    .item_img_wrap {
      position: relative;
      width: 100%;
      padding-top: 55%;
      background-size: cover;
      overflow: hidden;
      float: left;
      width: 115px;
      height: 64px;
      padding-top: 0;
      margin-right: 10px;
      background-size: 100%;
      border-radius: 5px;
      overflow: hidden;
      img {
        position: relative;
        width: 100%;
        height: 100%;
        // height: 64px;
        // width: auto;
        // max-width: none;
        // left: -6.5px;
      }
    }
    .item_subjectName {
      padding-top: 1px;
      height: 38px;
      font-weight: 500;
      font-size: 15px;
      line-height: 19px;
      color: #333;
      word-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .item_rate {
      float: right;
      margin-left: 14px;
      text-align: center;
      display: flex;
      flex-direction: column;
      .rate {
        width: 45px;
        height: 45px;
      }
      .desc {
        font-size: 12px;
        color: #45a8f5;
        line-height: 12px;
        margin-top: 4px;
      }
    }
  }
  .qwui-showMoreList {
    position: relative;
    font-size: 14px;
    color: #999;
    line-height: 44px;
    text-align: center;
    p {
      margin: 0;
    }
  }
  //已完成
  .qwui-no_record_box {
    position: fixed;
    margin-top: -92px;
    top: 50%;
    left: 0;
    right: 0;
    text-align: center;
  }
  .qwui-no_record_title {
    font-size: 18px;
    color: #666;
    margin: 0;
  }
  .qwui-no_record_text {
    margin-top: 10px;
    font-size: 14px;
    color: #bbb;
    line-height: 1;
  }
}
</style>
