<template>
  <div>
    <!-- 01图片 -->
    <img
      v-if="params.kjlx == '01'"
      class="img"
      :src="`http://dzjc.ruantechnology.com${picUrl}`"
      alt=""
    />
    <!-- 图文课件02 -->
    <div v-if="params.kjlx == '02'" v-html="imgContent"></div>
    <!-- docx03 -->
    <iframe
      :src="`http://dzjc.ruantechnology.com${pdfUrl}`"
      class="iframe"
    ></iframe>
    <!-- 04课件链接 -->
    <iframe v-if="params.kjlx == '04'" :src="iframUrl" class="iframe"></iframe>
  </div>
</template>
<script>
import { GetCourseWareInfo, UpdateUserCourseware } from "@/api/index.js";
// import pdf from "vue-pdf";
export default {
  name: "learn_resources",
  data() {
    return {
      id: "",
      pdfUrl: "", //pdf03
      imgContent: "", //图文课件02
      iframUrl: "", //课件链接04
      picUrl: "", //图片
      params: {},
      startTime: "",
      endTime: ""
    };
  },
  // components: {
  //   pdf
  // },
  mounted() {
    this.startTime = new Date().getTime();
    this.id = this.$route.query.id;
    console.log(this.id);
    this.getResource();
  },
  // 实例销毁前
  beforeDestroy() {
    this.UpdateUserCourseware();
  },
  methods: {
    //提交学习时间
    async UpdateUserCourseware() {
      this.endTime = new Date().getTime();
      const time = Math.floor((this.endTime - this.startTime) / 1000 / 60);
      if (time < 1) return;
      const params = {
        kcid: this.params.kcid,
        kjid: this.params.kjid,
        userid: "110",
        yxsc: time,
        zjxx: 1
      };
      const res = await UpdateUserCourseware(params);
      console.log(res);
    },
    async getResource() {
      const params = {
        courseWareid: this.id
      };
      const { status, data } = await GetCourseWareInfo(params);
      if (status !== 200) return;
      this.params = data.data;
      // 01图片
      if (data.data.kjlx == "01") {
        this.picUrl = data.data.kjnr;
      }
      // 04课件链接
      if (data.data.kjlx == "04") {
        this.iframUrl = data.data.kjnr;
      }
      // 02图文课件
      if (data.data.kjlx == "02") {
        this.imgContent = data.data.kjnr;
        console.log(this.imgContent, " this.imgContent");
      }
      // 03pdf
      if (data.data.kjlx == "03") {
        this.pdfUrl = data.data.kjnr;
      }
    }
  }
};
</script>
<style lang="less">
img {
  width: 100%;
  height: auto;
}
.iframe {
  width: 100%;
  min-height: 100vh;
}
.img {
  width: 100%;
  height: auto;
}
</style>
