import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: { name: "learning-tasks" }
    },
    {
      // 学习任务
      path: "/learning-tasks",
      name: "learning-tasks",
      component: () => import("./views/LearningTasks.vue")
    },
    {
      // 考试测评
      path: "/exam-assess",
      name: "exam-assess",
      component: () => import("./views/ExamAssess.vue")
    },
    {
      // 个人中心
      path: "/personal-center",
      name: "personal-center",
      component: () => import("./views/PersonalCenter.vue")
    },
    {
      // 最近学习
      path: "/learn-history",
      name: "learn——history",
      component: () => import("./views/LearnHistory.vue")
    },
    {
      // 考试记录
      path: "/examination-history",
      name: "examination-history",
      component: () => import("./views/examinationHistory.vue")
    },
    {
      // 学习任务首页
      path: "/learn-home",
      name: "learn-home",
      component: () => import("./views/LearnHome.vue")
    }
  ]
});
