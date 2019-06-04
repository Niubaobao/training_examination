<template>
  <div class="content-wapper">
    <ul class="list_content">
      <li class="qwui-learn_item">
        <div class="list_cover">
          <div class="cover_wrap">
            <img
              src="https://qwyimg.do1.com.cn/fileweb/compress/upload/img/4ab7e1bffe8f4201b99f5d4d160a668f/20190529/046ff26b6e60451d8148be3cf51cf78e.jpeg"
              alt=""
            />
          </div>
          <div class="cover_info">
            <p class="info_wrap stopTime_wrap">2019-06-05 截止 剩2天</p>
          </div>
        </div>
        <h2 class="list_title ellipsis">测试排版</h2>
        <div class="item_state">
          <span>
            <van-circle
              v-model="currentRate"
              :rate="30"
              :speed="100"
              size="14px"
              layer-color="#ebedf0"
            />
          </span>
          <span class="status learn_unend">已学0%</span>
        </div>
      </li>
      <li class="qwui-learn_item">
        <div class="list_cover">
          <div class="cover_wrap">
            <img
              src="https://qwyimg.do1.com.cn/fileweb/compress/upload/img/4ab7e1bffe8f4201b99f5d4d160a668f/20190529/046ff26b6e60451d8148be3cf51cf78e.jpeg"
              alt=""
            />
          </div>
          <div class="cover_info">
            <p class="info_wrap stopTime_wrap">2019-06-05 截止 剩2天</p>
          </div>
        </div>
        <h2 class="list_title ellipsis">测试排版</h2>
        <div class="item_state">
          <span>
            <van-circle
              v-model="currentRate"
              :rate="30"
              :speed="100"
              size="14px"
              layer-color="#ebedf0"
            />
          </span>
          <span class="status learn_unend">已学0%</span>
        </div>
      </li>
      <li class="qwui-learn_item">
        <div class="list_cover">
          <div class="cover_wrap">
            <img
              src="https://qwyimg.do1.com.cn/fileweb/compress/upload/img/4ab7e1bffe8f4201b99f5d4d160a668f/20190529/046ff26b6e60451d8148be3cf51cf78e.jpeg"
              alt=""
            />
          </div>
          <div class="cover_info">
            <p class="info_wrap stopTime_wrap">2019-06-05 截止 剩2天</p>
          </div>
        </div>
        <h2 class="list_title ellipsis">测试排版</h2>
        <div class="item_state">
          <span>
            <van-circle
              v-model="currentRate"
              :rate="30"
              :speed="100"
              size="14px"
              layer-color="#ebedf0"
            />
          </span>
          <span class="status learn_unend">已学0%</span>
        </div>
      </li>
    </ul>
    <p class="desc">共3节课</p>
  </div>
</template>
<script>
import { Circle } from "vant";
export default {
  name: "learn-home",
  data() {
    return {
      value: "",
      activeNames: ["1"],
      currentRate: 0
    };
  },
  mounted() {
    console.log(this.$route);
  },
  components: {
    "van-circle": Circle
  }
};
</script>

<style lang="less" scoped>
.content-wapper {
  p {
    margin: 0;
  }
  h2 {
    margin: 0;
  }
  .desc {
    text-align: center;
    font-size: 14px;
    color: #999;
    line-height: 44px;
  }
  .list_content {
    padding: 0 15px 0px 15px;
    box-sizing: border-box;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-wrap: wrap;
    .qwui-learn_item {
      -webkit-box-flex: 0;
      flex: 0 0 48%;
      min-width: 0;
      padding: 10px 0;
      box-sizing: border-box;
      .list_title {
        margin-bottom: 4px;
        color: #333;
        font-weight: normal;
        font-size: 15px;
        white-space: nowrap;
        word-wrap: normal;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .item_state {
        .status {
          margin-left: 6px;
          vertical-align: top;
          line-height: 14px;
          color: #45a8f5;
          font-size: 12px;
          line-height: 22px;
        }
      }
      .list_cover {
        position: relative;
        width: 100%;
        padding-top: 55%;
        overflow: hidden;
        border-radius: 5px;
        margin-bottom: 8px;
        .cover_wrap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          img {
            position: relative;
            height: 187px;
            width: auto;
            max-width: none;
            left: -16.5px;
            vertical-align: middle;
          }
        }
        .cover_info {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 35px;
          background: linear-gradient(
            to top,
            rgba(1, 1, 1, 0.12),
            rgba(1, 1, 1, 0)
          );
          .info_wrap {
            position: absolute;
            bottom: 2px;
            font-size: 12px;
            color: #fff;
            left: 8px;
          }
        }
      }
    }
  }
}
</style>
