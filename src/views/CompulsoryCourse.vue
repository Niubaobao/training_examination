<template>
  <div class="content-wapper">
    <!--  -->
    <div class="loadmore"></div>
    <!--  -->
    <ul class="list_content">
      <li
        class="qwui-learn_item"
        v-for="item in sourceArr"
        :key="item.kcid"
        @click="goDetail(item.kcid)"
      >
        <div class="list_cover">
          <div class="cover_wrap">
            <img :src="`http://dzjc.ruantechnology.com${item.kcfm}`" alt="" />
          </div>
          <div class="cover_info">
            <p class="info_wrap stopTime_wrap">
              {{ item.wcsj }} 截止 剩{{ item.syts }}天
            </p>
          </div>
        </div>
        <h2 class="list_title ellipsis">{{ item.kcmc }}</h2>
        <div class="item_state">
          <span>
            <van-circle
              v-model="currentRate"
              :rate="item.xxjd"
              :speed="1"
              size="14px"
              layer-color="#ebedf0"
            />
          </span>
          <span class="status learn_unend">已学{{ item.xxjd * 100 }}%</span>
        </div>
      </li>
    </ul>
    <p v-if="sourceArr.length" class="desc">共{{ sourceArr.length }}节课</p>
  </div>
</template>
<script>
import { Circle } from "vant";
import { getCourses } from "@/api/index.js";
export default {
  name: "learn-home",
  data() {
    return {
      error: false,
      finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
      loading: false, //控制上啦加载的加载动画
      value: "",
      activeNames: ["1"],
      currentRate: 0,
      PageSize: 10,
      currentIndex: 1,
      keyword: "",
      type: 1,
      kklx: "",
      sourceArr: []
    };
  },
  mounted() {
    this.type = Number(this.$route.query.type);
    if (this.type === 1) {
      this.kklx = "02";
    } else if (this.type === 2) {
      this.kklx = "01";
    }
    this.getList();
  },
  components: {
    "van-circle": Circle
  },
  methods: {
    //页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
    onLoad() {},
    //下拉刷新
    onRefresh() {},
    //跳转详情
    goDetail(id) {
      this.$router.push({
        path: "/course-introduce",
        query: {
          id: id
        }
      });
    },
    async getList() {
      const params = {
        userid: 110,
        keyword: this.keyword,
        kklx: this.kklx,
        pageIndex: this.currentIndex,
        pageSize: this.PageSize
      };
      const { status, data } = await getCourses(params);
      if (status !== 200) return;
      this.sourceArr = data.data.Items;
      // this.formatArray(data.data.Items);
    },
    //初始化数据
    formatArray(items) {
      console.log(items);
      if (items.length > 0) {
        const optionalArr = [];
        const mandatoryArr = [];
        items.map(item => {
          if (item.kklx == "选修课") {
            optionalArr.push(item);
          } else if (item.kklx == "必修课") {
            mandatoryArr.push(item);
          }
        });
        if (this.type == 1) {
          this.sourceArr = mandatoryArr;
        } else if (this.type == 2) {
          this.sourceArr = optionalArr;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.content-wapper {
  width: 100%;
  li {
    list-style: none;
  }
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
            width: 100%;
            height: 100%;
            // height: 187px;
            // width: auto;
            max-width: none;
            // left: -16.5px;
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
