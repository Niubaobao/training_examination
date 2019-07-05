import { getExamDetail, submitAnswer, updateExamStatus } from "../../api";

// initial state
const state = {
  detail: {},
  index: 0,
  loading: false
};

// getters
const getters = {};

// actions
const actions = {
  async getDetail({ commit }, params) {
    commit("setLoading", true);
    const { data = {} } =
      (await getExamDetail({
        ...params
      })) || {};
    commit("setDetail", data.data || {});
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
