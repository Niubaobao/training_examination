import Vue from "vue";
import Vuex from "vuex";
import learningTasks from "./modules/learningTasks";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    learningTasks
  }
});
