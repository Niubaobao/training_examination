import Vue from 'vue'
import Router from 'vue-router'
// import { userLogin } from "@/api/index.js";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 学习任务
    {
      path: '/',
      redirect: { name: 'learning-tasks' },
    },
    {
      // 学习任务
      path: '/learning-tasks',
      name: 'learning-tasks',
      meta: {
        title: '学习任务',
      },
      component: () => import('./views/LearningTasks.vue'),
    },
    {
      // 考试测评
      path: '/exam-assess',
      name: 'exam-assess',
      meta: {
        title: '考试评测',
      },
      component: () => import('./views/ExamAssess.vue'),
    },
    {
      // 考试测评-详情
      path: '/exam-assess-detail',
      name: 'exam-assess-detail',
      meta: {
        title: '考试详情',
      },
      component: () => import('./views/ExamAssessDetail.vue'),
    },
    {
      // 考试测评-结果
      path: '/exam-assess-result',
      name: 'exam-assess-result',
      meta: {
        title: '考试结果',
      },
      component: () => import('./views/ExamAssessResult.vue'),
    },
    {
      // 考试测评-进行中
      path: '/exam-assessing',
      name: 'exam-assessing',
      meta: {
        title: '考试中',
      },
      component: () => import('./views/ExamAssessing.vue'),
    },
    {
      // 个人中心
      path: '/personal-center',
      name: 'personal-center',
      meta: {
        title: '个人中心',
      },
      component: () => import('./views/PersonalCenter.vue'),
    },
    {
      // 最近学习
      path: '/learn-history',
      name: 'learn——history',
      meta: {
        title: '学习记录',
      },
      component: () => import('./views/LearnHistory.vue'),
    },
    {
      // 考试记录
      path: '/examination-history',
      name: 'examination-history',
      meta: {
        title: '考试记录',
      },
      component: () => import('./views/examinationHistory.vue'),
    },
    {
      // 必修课 选修课
      path: '/compulsory-course',
      name: 'compulsory-course',
      component: () => import('./views/CompulsoryCourse.vue'),
    },
    {
      // 课程介绍
      path: '/course-introduce',
      name: 'course-introduce',
      meta: {
        title: '课程详情',
      },
      component: () => import('./views/CourseIntroduce.vue'),
    },
    {
      // 学习资源
      path: '/learn-resources',
      name: 'learn-resources',
      meta: {
        title: '学习资源',
      },
      component: () => import('./views/learnResources.vue'),
    },
    {
      path: '/examination-reg',
      name: 'epoliceReg',
      component: () => import('./views/examinationReg'),
      meta: {
        title: '用户注册',
      },
    },
  ],
})
router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

// router.beforeEach(async (to, from, next) => {
// const KEY = "training_examination_user";
// const localStorage = window.localStorage;
// const url = to.fullPath;
// const str = localStorage.getItem(KEY);
// const code = to.query.code;
// if (code) {
//   if (!str) {
//     const params = {
//       wxcode: code
//     };
//     const { status, data } = await userLogin(params);
//     if (status == 200) {
//       if (data && data.data) {
//         localStorage.setItem(KEY, JSON.stringify(data.data));
//         return next();
//       }
//     }
//   } else {
//     return next();
//   }
// } else {
//   gotoWx(url);
// }
// });
// ----------------------
// if (code) {
//   if (to.path === "/epolice-reg") {
//     return next();
//   }
//   if (!str) {
//     // 调用后端接口
//     const params = {
//       wxcode: code
//     };
//     const { status, data } = await userLogin(params);
//     console.log(data);
//     if (status == 200) {
//       if (data && data.data) {
//         localStorage.setItem(KEY, JSON.stringify(data.data));
//         return next();
//       } else {
//         return router.push("/epolice-reg");
//       }
//     } else {
//       // 跳转注册页
//       return router.push("/epolice-reg");
//     }
//   } else {
//     const { userid } = JSON.parse(str);
//     if (!userid) {
//       return router.push("/epolice-reg");
//     } else {
//       return next();
//     }
//   }
// } else {
//   gotoWx(url);
// }
// });
// 需要换成新应用的应用信息
export const gotoWx = url => {
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww24a164bc2a6b8202&redirect_uri=http://pxks.ruantechnology.com${url}&response_type=code&scope=snsapi_base&agentid=1000007&state=123&connect_redirect=1#wechat_redirect`
}

export default router
