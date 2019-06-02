<template>
  <div class="personal-center">
    <PageWithTab>
      <div class="content">
        <!-- 个人信息 -->
        <div class="person_info">
          <div class="lean_user_portrait">
            <img
              src="http://yy2.tv.cmvideo.cn:8088/migutv/res/2018/04/12/507JOLBV8RPC.jpg"
              alt=""
            />
          </div>
          <p class="lean_user_name">张亚超</p>
          <div class="lean_user_info qwui-flexbox">
            <div class="qwui-flexItem info_item">
              <p>0</p>
              <p class="lable total_score">总学分</p>
            </div>
            <div class="qwui-flexItem info_item">
              <p>0小时0分钟</p>
              <p class="lable">学习时长</p>
            </div>
            <div class="qwui-flexItem info_item">
              <p>2</p>
              <p class="lable">学习课程</p>
            </div>
          </div>
        </div>
        <!-- listitem -->
        <div>
          <div class="item">
            <van-cell
              title="最近学习"
              icon="underway-o"
              is-link
              to="/learning-tasks"
            />
          </div>
          <van-cell
            title="考试记录"
            icon="records"
            is-link
            url="http://www.baidu.com"
          />
        </div>
      </div>
    </PageWithTab>
  </div>
</template>
<script>
// @ is an alias to /src
import PageWithTab from "@/components/PageWithTab.vue";
import { Cell } from "vant";

export default {
  name: "personal-center",
  components: {
    PageWithTab,
    "van-cell": Cell
  }
};
</script>

<style lang="less" scoped>
.content {
  p {
    margin: 0;
  }
  .person_info {
    position: relative;
    height: 140px;
    margin: 24px 14px 16px;
    text-align: center;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0px 2px 8px 0px rgba(223, 223, 223, 0.5);
    .lean_user_portrait {
      position: relative;
      top: -12px;
      width: 48px;
      height: 48px;
      margin: 0 auto;
      border-radius: 50%;
      border: 1px solid #f5f5f5;
      background: #fcfdff;
      overflow: hidden;
      img {
        max-width: 100%;
        vertical-align: middle;
        border: 0;
      }
    }
    .lean_user_name {
      line-height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: #85868f;
      font-weight: 400;
    }
    .lean_user_info {
      margin-top: 18px;
    }
    .qwui-flexbox {
      display: flex;
    }
    .qwui-flexItem {
      flex: 1;
    }
    .lable {
      margin-top: 4px;
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #b2b9c8;
      line-height: 20px;
    }
  }
  .item {
    margin-bottom: 8px;
  }
}
</style>
