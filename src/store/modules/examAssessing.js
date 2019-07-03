import { getExamDetail } from "../../api";

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
