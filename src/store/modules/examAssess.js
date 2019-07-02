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
  async getList({ commit }) {
    commit("setLoading", true);
    const { data = {} } =
      (await getExamList({
        userid: 110,
        pageIndex: 1,
        pageSize: 10
      })) || {};
    commit("setList", data.data);
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
