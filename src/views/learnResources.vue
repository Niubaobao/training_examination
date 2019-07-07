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
    <div v-if="params.kjlx == '03'">
      <canvas
        v-for="page in pages"
        :id="'the-canvas' + page"
        :key="page"
      ></canvas>
    </div>
    <!-- 04课件链接 -->
    <iframe v-if="params.kjlx == '04'" :src="iframUrl" class="iframe"></iframe>
  </div>
</template>
<script>
import { GetCourseWareInfo, UpdateUserCourseware } from "@/api/index.js";
import PDFJS from "pdfjs-dist";
import { clearInterval } from "timers";
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
      endTime: "",
      pages: [],
      timer: null
    };
  },
  mounted() {
    this.startTime = new Date().getTime();
    this.id = this.$route.query.id;
    this.getResource();
    setTimeout(this.UpdateUserCourseware(), 1000 * 60);
  },
  // 实例销毁前
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    //提交学习时间
    UpdateUserCourseware() {
      // this.endTime = new Date().getTime();
      // const time = Math.floor((this.endTime - this.startTime) / 1000 / 60);
      // if (time < 1) return;
      this.timer = setInterval(async () => {
        const params = {
          kcid: this.params.kcid,
          kjid: this.params.kjid,
          userid: "110",
          yxsc: 1,
          zjxx: 1
        };
        const res = await UpdateUserCourseware(params);
        console.log(res);
      }, 1000 * 60);
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
        this._loadFile(`http://dzjc.ruantechnology.com${data.data.kjnr}`);
      }
    },
    _renderPage(num) {
      this.pdfDoc.getPage(num).then(page => {
        let canvas = document.getElementById("the-canvas" + num);
        let ctx = canvas.getContext("2d");
        let dpr = window.devicePixelRatio || 1;
        let bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1;
        let ratio = dpr / bsr;
        let viewport = page.getViewport(
          screen.availWidth / page.getViewport(1).width
        );
        canvas.width = viewport.width * ratio;
        canvas.height = viewport.height * ratio;
        canvas.style.width = viewport.width + "px";
        canvas.style.height = viewport.height + "px";
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        let renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        page.render(renderContext);
        if (this.pages > num) {
          this._renderPage(num + 1);
        }
      });
    },
    _loadFile(url) {
      PDFJS.getDocument(url).then(pdf => {
        this.pdfDoc = pdf;
        console.log(pdf);
        this.pages = this.pdfDoc.numPages;
        this.$nextTick(() => {
          this._renderPage(1);
        });
      });
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
