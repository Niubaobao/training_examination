<template>
  <div class="tabbars">
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/learning-tasks"
        >学习任务</van-tabbar-item
      >
      <van-tabbar-item icon="search" to="/exam-assess"
        >考试测评</van-tabbar-item
      >
      <van-tabbar-item icon="friends-o" to="/personal-center"
        >个人中心</van-tabbar-item
      >
    </van-tabbar>
    <slot></slot>
  </div>
</template>

<script>
// @ is an alias to /src
import { Tabbar, TabbarItem } from "vant";

export default {
  name: "PageWithTab",
  components: {
    "van-tabbar": Tabbar,
    "van-tabbar-item": TabbarItem
  }
};
</script>
