import { getExamList } from "../../api";

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
  async getList({ commit }, params) {
    commit("setLoading", true);
    const { data = {} } =
      (await getExamList({
        userid: 110,
        ...params
      })) || {};
    const list = data.data || [];
    commit("setFinished", list.length < 10);
    commit("setList", list);
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
    state.finished = bool;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
