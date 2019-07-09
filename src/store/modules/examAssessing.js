import { getExamDetail, submitAnswer, updateExamStatus } from "../../api";

// initial state
const state = {
  detail: {},
  index: 0,
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
        sfck: "01"
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
  async submitAnswer({ commit }, params) {
    commit("setLoading", true);
    await submitAnswer({
      ...params,
      userid: 110
    });
    commit("setLoading", false);
  },
  async updateExamStatus({ commit }, params) {
    commit("setLoading", true);
    await updateExamStatus({
      ...params,
      userid: 110
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
