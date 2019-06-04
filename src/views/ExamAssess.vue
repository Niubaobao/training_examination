<template>
  <div class="exama-ssess">
    <PageWithTab>
      <van-list
        :value.sync="loading"
        :finished="finished"
        finished-text="没有更多了"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <div class="time">{{ item.time }}</div>
          <div class="title">
            <span class="tag">{{ item.tag }}</span>
            <div>{{ item.title }}</div>
          </div>
          <div class="end_time">截止时间：{{ item.end_time }}</div>
          <div class="time_long">考试时间：{{ item.time_long }}</div>
          <div class="desc">{{ item.desc }}</div>
          <div class="btn-wrap">
            <van-button class="btn" size="small" plain hairline type="danger"
              >继续考试 29:30</van-button
            >
          </div>
        </div>
      </van-list>
    </PageWithTab>
  </div>
</template>
<script>
// @ is an alias to /src
import { createNamespacedHelpers } from "vuex";
import PageWithTab from "@/components/PageWithTab.vue";
import { List, Button } from "vant";

const { mapActions, mapState } = createNamespacedHelpers("examAssess");

export default {
  name: "exama-ssess",
  components: {
    PageWithTab,
    "van-list": List,
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
.item {
  display: flex;
  flex-direction: column;
  padding: 15px;
  background: #fff;
  margin-bottom: 4px;
  .time {
    font-size: 18px;
    color: #666;
    margin-bottom: 5px;
  }
  .title {
    display: flex;
    font-size: 16px;
    color: #333;
    margin-bottom: 7px;
    .tag {
      color: #fff;
      background-color: red;
      border-radius: 5px;
      font-size: 12px;
      padding: 2px;
      margin-right: 5px;
    }
  }
  .end_time,
  .time_long {
    font-size: 12px;
    color: #777;
  }
  .desc {
    margin-top: 7px;
    font-size: 14px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .btn-wrap {
    text-align: right;
    margin-top: 10px;
    .btn {
      width: 100px;
    }
  }
}
</style>
