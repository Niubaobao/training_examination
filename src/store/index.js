import Vue from "vue";
import Vuex from "vuex";
import examAssess from "./modules/examAssess";
import examAssessDetail from "./modules/examAssessDetail";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    examAssess,
    examAssessDetail
  }
});
