<template>
  <div class="learning-tasks">
    <a href="tel:400-608-2005"
      >heltel:400-608-2005tel:400-608-2005tel:400-608-2005tel:400-608-2005tel:400-608-2005looo</a
    >
    <PageWithTab>
      <div class="content-wapper">
        <van-search
          style="border-bottom:1px solid #eeeeee"
          placeholder="搜索"
          v-model="keyword"
          @search="getList"
        />
        <div class="content">
          <div class="qwui-lean_task">
            <div class="course_list_wrap" v-if="mandatoryArr.length">
              <div class="course_list_head qwui-flexbox">
                <span class="qwui-flexItem">必学课</span>
                <span class="arrow_icon" @click="goDetail(1)">
                  <span class="qwui-icon_arrow_fr">
                    全部<van-icon name="arrow" />
                  </span>
                </span>
              </div>
              <ul class="list_content">
                <li
                  class="qwui-learn_item"
                  v-for="item in mandatoryArr"
                  :key="item.kcid"
                  @click="goDetailPage(item.kcid)"
                >
                  <div class="list_cover">
                    <div class="cover_wrap">
                      <img
                        :src="`http://dzjc.ruantechnology.com${item.kcfm}`"
                        alt=""
                      />
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
                        v-model="item.currentRate"
                        :rate="item.xxjd * 100"
                        :speed="100"
                        size="14px"
                        layer-color="#ebedf0"
                      />
                    </span>
                    <span class="status learn_unend"
                      >已学{{ formatPrec(item) }}</span
                    >
                  </div>
                </li>
              </ul>
            </div>
            <!-- 选学 -->
            <div class="course_list_wrap" v-if="optionalArr.length">
              <div class="course_list_head qwui-flexbox">
                <span class="qwui-flexItem">选学课</span>
                <span class="arrow_icon" @click="goDetail(2)">
                  <span class="qwui-icon_arrow_fr">
                    全部<van-icon name="arrow" />
                  </span>
                </span>
              </div>
              <ul class="list_content">
                <li
                  class="qwui-learn_item"
                  v-for="item in optionalArr"
                  :key="item.kcid"
                  @click="goDetailPage(item.kcid)"
                >
                  <div class="list_cover">
                    <div class="cover_wrap">
                      <img
                        :src="`http://dzjc.ruantechnology.com${item.kcfm}`"
                        alt=""
                      />
                    </div>
                    <!-- 选修课没有完成时间 -->
                    <!-- <div class="cover_info">
                      <p class="info_wrap stopTime_wrap">
                        2019-06-05 截止 剩2天
                      </p>
                    </div> -->
                  </div>
                  <h2 class="list_title ellipsis">{{ item.kcmc }}</h2>
                  <div class="item_state">
                    <span>
                      <van-circle
                        v-model="currentRate1"
                        :rate="item.xxjd * 100"
                        :speed="100"
                        size="14px"
                        layer-color="#ebedf0"
                      />
                    </span>
                    <span class="status learn_unend"
                      >已学{{ formatPrec(item) }}</span
                    >
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageWithTab>
  </div>
</template>
<script>
// @ is an alias to /src
import PageWithTab from '@/components/PageWithTab.vue'
import { Search, Icon, Circle } from 'vant'
import { getCourses, testProxy } from '@/api/index.js'

export default {
  name: 'learning-tasks',
  components: {
    PageWithTab,
    'van-search': Search,
    'van-icon': Icon,
    'van-circle': Circle,
  },
  data() {
    return {
      optionalArr: [], //选修课
      mandatoryArr: [], //必休课
      activeNames: ['1'],
      currentRate: 0,
      currentRate1: 0,
      PageSize: 10,
      currentIndex: 1,
      keyword: '',
    }
  },
  mounted() {
    console.log('?????')
    this.testDemo()
    this.getList()
  },
  methods: {
    formatPrec(item) {
      return `${parseInt(item.xxjd * 100)}%`
    },
    //课程详情
    goDetailPage(id) {
      this.$router.push({
        path: '/course-introduce',
        query: { id: id },
      })
    },

    async testDemo() {
      console.log('hahahah')
      const params = {
        // link: 'https://www.baidu.com/',
        username: 'admin',
        password: '123456',
      }
      const res = await testProxy(params)
      console.log(res)
    },
    async getList() {
      const params = {
        userid: 110,
        keyword: this.keyword,
        kklx: '',
        pageIndex: this.currentIndex,
        pageSize: this.PageSize,
      }
      const { status, data } = await getCourses(params)
      if (status !== 200) return
      this.formatArray(data.data.Items)
    },
    //初始化数据
    formatArray(items) {
      if (items.length > 0) {
        const optionalArr = []
        const mandatoryArr = []
        items.map(item => {
          console.log(item)
          const ite = Object.assign({}, item, { currentRate: 0 })
          if (ite.kklx === '选修课') {
            optionalArr.push(ite)
          } else if (ite.kklx === '必修课') {
            mandatoryArr.push(ite)
          }
        })
        this.optionalArr = optionalArr
        this.mandatoryArr = mandatoryArr
        console.log(this.mandatoryArr, this.optionalArr)
      }
    },
    goDetail(value) {
      this.$router.push({
        path: '/compulsory-course',
        query: { type: value },
      })
    },
  },
}
</script>
<style lang="less" scoped>
.content {
  p {
    margin: 0;
  }
  h2 {
    margin: 0;
  }
  .qwui-lean_task {
    .course_list_wrap {
      padding: 0 15px 20px 15px;
      background: #fff;
      margin-bottom: 10px;
      box-sizing: border-box;
      .qwui-flexbox {
        display: flex;
        .qwui-flexItem {
          flex: 1;
        }
        .arrow_icon {
          padding-left: 50px;
          line-height: 32px;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          align-items: center;
          .qwui-icon_arrow_fr {
            line-height: 0;
            font-size: 14px;
            font-weight: 400;
            color: #b2b9c8;
            box-sizing: border-box;
            display: inline-block;
          }
        }
      }
      .course_list_head {
        padding-top: 12px;
        font-size: 20px;
        font-weight: 600;
        line-height: 38px;
        color: #333;
        box-sizing: border-box;
      }
    }
  }
  .list_content {
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
            // height: 187px;
            // width: auto;
            width: 100%;
            height: 100%;
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
