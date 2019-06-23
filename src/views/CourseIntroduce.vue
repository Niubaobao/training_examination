<template>
  <div class="scroll_wrap">
    <div class="preview_wrap">
      <!-- 视频 -->
      <div class="cover_wrap">
        <div class="test_two_box">
          <!-- vjs-big-play-centered -->
          <video ref="myVideo" class="video-js">
            <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
          </video>
        </div>
        <!-- data.kcfm -->
        <img
          :src="`http://dzjc.ruantechnology.com${headerBg}`"
          v-if="posterBtn"
          style="z-index:10"
          alt=""
        />
      </div>
      <!-- 朦层 -->
      <div class="tip_warp" v-if="posterBtn">
        <div class="tip_box">
          <div v-if="currentTitle">
            <p class="tip_last_learn">最近学习到：{{ currentTitle }}</p>
            <div class="tip_btn" @click="playVideo">继续学习</div>
          </div>
          <div v-if="!currentTitle">
            <img
              @click="playVideo"
              style="width:50px;height:50px;margin-top:20px"
              src="../assets/images/start1.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div class="header">
      <div class="lf" @click="tab = 0">介绍</div>
      <div class="rg" @click="tab = 1">目录</div>
      <div class="line" :class="tab === 0 ? 'lfactive' : 'rgactive'">
        <span class="active"></span>
      </div>
    </div>
    <!-- 介绍 -->
    <div v-if="tab === 0" class="introduce">
      <div class="introduce_wrap">
        <div class="course_info">
          <p class="course_title">{{ data.kcmc }}</p>
          <p class="learn_num">0 人学完</p>
        </div>
        <div class="course_info">
          <p class="course_title">课程简介</p>
          <p class="learn_num">{{ data.kcjj }}</p>
        </div>
        <div class="course_info">
          <p class="course_title">适用人群</p>
          <p class="learn_num">{{ data.syrq }}</p>
        </div>
        <div class="course_info">
          <p class="course_title">
            可程学分 <span class="course_credit_num">{{ data.kcxf }}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 目录 -->
    <div v-if="tab === 1" class="catalogue">
      <van-collapse v-model="activeNames" accordion @change="onChange">
        <div v-for="(item, index) in catalogue" :key="item.zjid">
          <van-collapse-item :title="item.zjmc" :name="index">
            <ul class="chapter_list">
              <li
                class="courseware"
                v-for="itm in item.zjnr"
                :key="itm.kjid"
                @click="startLearn(itm)"
              >
                <div class="course_info">
                  <p
                    class="course_name"
                    :class="{ activeName: itm.zjxx === 1 }"
                  >
                    {{ itm.kjmc }}
                  </p>
                  <p class="learn_time">
                    {{ itm.yxsc }}分钟/{{ itm.xxsc }}分钟
                  </p>
                </div>
                <div class="course_state">
                  <van-circle
                    v-model="itm.currentRate"
                    size="20px"
                    layer-color="#ebedf0"
                    :rate="formatValue(itm)"
                    :speed="100"
                  />
                </div>
              </li>
            </ul>
          </van-collapse-item>
        </div>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import { Collapse, CollapseItem, Circle, ImagePreview } from "vant";
import { getCourseInfo } from "@/api/index.js";

export default {
  name: "course-introduce",
  data() {
    return {
      currentData: {},
      headerBg: "",
      show: false,
      index: 1,
      images: [],
      currentTitle: "",
      video: "",
      posterBtn: true,
      tab: 0,
      currentRate: 0,
      activeNames: "",
      id: "",
      data: {},
      catalogue: [] //目录
    };
  },
  components: {
    "van-collapse": Collapse,
    "van-collapse-item": CollapseItem,
    "van-circle": Circle
  },
  mounted() {
    this.id = this.$route.query.id;
    this.$nextTick(() => {
      this.initVideo();
      this.getCourseInfo();
    });
  },
  methods: {
    formatValue(item) {
      return parseInt((item.yxsc / item.xxsc) * 100);
    },
    initImage() {
      ImagePreview({
        images: this.images,
        onClose: this.onClose
      });
    },
    onClose() {
      this.images = [];
    },
    //点击开始学习
    startLearn(item) {
      this.$router.push({
        path: "/learn-resources",
        query: {
          id: item.kjid
        }
      });
      // if (item.kjlx === "01") {
      //   //图片链接
      //   const str = `http://dzjc.ruantechnology.com${item.kjnr}`;
      //   this.headerBg = item.kjnr;
      //   this.images.push(str);
      //   this.initImage();
      // }
    },
    // 点击开始播放视频
    playVideo() {
      if (this.currentData.kjlx !== "06") {
        this.$router.push({
          path: "/learn-resources",
          query: {
            id: this.currentData.kjid
          }
        });
        return;
      } else {
        this.video.play();
        this.posterBtn = false;
      }
    },
    //初始化video
    initVideo() {
      this.video = this.$video(this.$refs.myVideo, {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        //自动播放属性,muted:静音播放
        // autoplay: "muted",
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        //设置视频播放器的显示宽度（以像素为单位）
        width: "100%",
        //设置视频播放器的显示高度（以像素为单位）
        height: "400px"
      });
    },
    onChange(event) {
      this.activeName = event.detail;
    },
    async getCourseInfo() {
      const params = {
        courseid: this.id
      };
      const { status, data } = await getCourseInfo(params);
      if (status !== 200) return;
      this.data = data.data;
      this.formatArr(data.data.kcnr);
      // this.catalogue = data.data.kcnr;
      this.headerBg = data.data.kcfm;
      this.findCurrentTitle(data.data.kcnr);
      if (!this.currentTitle) {
        this.currentData = data.data.kcnr[0].zjnr[0];
      }
    },
    formatArr(arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].zjnr.length; j++) {
          arr[i].zjnr[j].currentRate = 0;
        }
      }
      this.catalogue = arr;
    },
    findCurrentTitle(arr) {
      if (!arr.length) return;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].zjnr) {
          for (let j = 0; j < arr[i].zjnr.length; j++) {
            if (arr[i].zjnr[j].zjxx === 1) {
              this.currentData = arr[i].zjnr[j];
              this.currentTitle = arr[i].zjnr[j].kjmc;
              return;
            }
          }
        }
      }
      return arr;
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .van-collapse-item__title {
  background: #f7f7f7;
}
/deep/ .van-collapse-item__content {
  padding: 0;
}
/deep/ .vjs-big-play-butto {
  background: red;
}
/deep/ .vjs-big-play-button {
  display: none;
}
.scroll_wrap {
  p {
    margin: 0;
  }
  .preview_wrap {
    width: 100%;
    height: 206px;
    position: relative;
    .cover_wrap {
      width: 100%;
      height: 100%;
      .test_two_box {
        width: 100%;
        height: 100%;
        .video-js {
          width: 100%;
          height: 100%;
          position: relative;
        }
      }
    }
    .cover_wrap img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .tip_warp {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      bottom: 0;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.6);
      .tip_box {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        width: 290px;
        height: 80px;
        margin: auto;
        font-size: 16px;
        color: #fff;
        text-align: center;
        .tip_last_learn {
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .tip_btn {
          width: 105px;
          height: 36px;
          margin: 20px auto 0;
          font-size: 15px;
          line-height: 36px;
          border: 1px solid #fff;
          border-radius: 18px;
          background-color: rgba(31, 34, 36, 0.5);
        }
      }
    }
  }
  .header {
    width: 100%;
    height: 44px;
    position: relative;
    display: flex;
    line-height: 44px;
    text-align: center;
    background: white;
    border-bottom: 1px solid #eeeeee;
    .lf {
      flex: 1;
    }
    .rg {
      flex: 1;
    }
    .line {
      position: absolute;
      bottom: 0;
      width: 50%;
      height: 3px;
      .active {
        width: 70%;
        height: 100%;
        display: block;
        background-color: #2f7dcd;
        margin: auto;
      }
    }
    .lfactive {
      left: 0;
      right: 50%;
    }
    .rgactive {
      left: 50%;
      right: 0;
    }
  }
  .introduce_wrap {
    .course_info {
      margin-bottom: 10px;
      padding: 15px;
      background-color: #fff;
      box-sizing: border-box;
      .course_title {
        margin-bottom: 6px;
        font-family: "PingFang-SC-Medium";
        font-size: 19px;
        color: #333;
        .course_credit_num {
          margin-left: 6px;
        }
      }
      .learn_num {
        margin-bottom: 10px;
        font-size: 13px;
        color: #999;
      }
    }
  }
  .catalogue {
    .chapter_list {
      padding-left: 15px;
      background-color: #fff;
      box-sizing: border-box;
      .courseware {
        height: 65px;
        cursor: pointer;
        position: relative;
        display: flex;
        border-bottom: 1px solid #eeeeee;
        .course_info {
          flex: 1;
          .course_name {
            box-sizing: border-box;
            padding-top: 12px;
            font-size: 16px;
            color: #333;
            white-space: nowrap;
            word-wrap: normal;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .activeName {
            color: red;
          }
          .learn_time {
            font-size: 13px;
            color: #999;
          }
        }
        .course_state {
          position: relative;
          width: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .courseware:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
