import { getExamDetail, resetExam } from "../../api";

// initial state
const state = {
  detail: {},
  loading: false,
  ansers: []
};

// getters
const getters = {};

// actions
const actions = {
  async getDetail({ commit }, params) {
    commit("setLoading", true);
    const { data = {} } =
      (await getExamDetail({
        ...params,
        sfck: "02"
      })) || {};
    const detail = data.data || {};
    const questions = detail.questions || [];
    const ansers = [];
    questions.forEach(item => {
      if (item.stlx === "01" || item.stlx === "03") {
        ansers.push(item.stda);
      } else if (item.stlx === "02" || item.stlx === "04") {
        ansers.push(item.stda ? item.stda.split(";") : []);
      } else {
        ansers.push(item.stda);
      }
    });
    commit("setAnsers", ansers);
    commit("setDetail", detail);
    commit("setLoading", false);
  },
  async resetExam({ commit }, params) {
    commit("setLoading", true);
    await resetExam({
      userid: 110,
      ...params
    });
    commit("setLoading", false);
  }
};

// mutations
const mutations = {
  setDetail(state, data) {
    state.detail = data;
  },
  setLoading(state, bool) {
    state.loading = bool;
  },
  setAnsers(state, data) {
    state.ansers = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
