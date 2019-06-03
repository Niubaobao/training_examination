import { getList } from "../../api";

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
    const data = await getList();
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
