import Vue from "vue";
import Vuex from "vuex";
import learningTasks from "./modules/learningTasks";
import examAssess from "./modules/examAssess";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    learningTasks,
    examAssess
  }
});
