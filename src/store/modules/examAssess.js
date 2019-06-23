import { getList } from "../../api";

const dataMock = [
  {
    id: 1,
    time: "05月29日 星期一",
    title: "常规实体",
    tag: "答题中",
    end_time: "2019-03-24",
    time_long: "30分钟",
    desc:
      "这是一场得到几点几分积分肺癌饿哦， 满额我的卡么昂帕瓦罗蒂吗，都怕额外，搭配，搭配爱我的胖娃打排位，吊牌额阿瓦"
  },
  {
    id: 2,
    time: "06月29日 星期一",
    title: "送命题",
    tag: "答题中",
    end_time: "2019-03-27",
    time_long: "150分钟",
    desc:
      "这是一场得到几点几分积分肺癌饿哦， 满额我的卡么昂帕瓦罗蒂吗，都怕额外，搭配，搭配爱我的胖娃打排位，吊牌额阿瓦"
  },
  {
    id: 3,
    time: "06月29日 星期一",
    title: "送命题",
    tag: "答题中",
    end_time: "2019-03-27",
    time_long: "150分钟",
    desc:
      "这是一场得到几点几分积分肺癌饿哦， 满额我的卡么昂帕瓦罗蒂吗，都怕额外，搭配，搭配爱我的胖娃打排位，吊牌额阿瓦"
  }
];

// initial state
const state = {
  list: [],
  loading: false,
  finished: false
};

// getters
const getters = {};

// actions
const actions = {
  async getList({ commit }) {
    commit("setLoading", true);
    const { data = dataMock } = (await getList()) || {};
    console.info(data, "data");
    commit("setList", data);
    commit("setLoading", false);
  }
};

// mutations
const mutations = {
  setList(state, data) {
    state.list = data;
  },
  setLoading(state, bool) {
    state.loading = bool;
  },
  setFinished(state, bool) {
    state.loading = bool;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
