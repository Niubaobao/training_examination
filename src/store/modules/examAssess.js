import { getExamList, resetExam } from "../../api";

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
        kszt: "01",
        ...params
      })) || {};
    const { PageIndex, Items, TotalPages } = data.data || {};
    console.info(Items, "list");
    commit("setFinished", PageIndex >= TotalPages);
    commit("setList", Items);
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
