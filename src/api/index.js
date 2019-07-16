import axios from "axios";
const instance = axios.create({
  baseURL: "http://dzjc.ruantechnology.com/api",
  timeout: 1000
});
instance.interceptors.response.use(
  res => res.data,
  err => {
    console.info(err);
  }
);
export const getExamList = params =>
  instance.get("electronictraining/Examination/GetExaminations", {
    params
  });
export const getExamDetail = params =>
  instance.get("electronictraining/Examination/GetExaminationInfo", {
    params
  });
export const submitAnswer = params =>
  instance.post("electronictraining/Examination/SubmitQuestionAnswer", {
    ...params
  });
export const updateExamStatus = params =>
  instance.post("electronictraining/Examination/UpdateExamination", {
    ...params
  });
export const resetExam = params =>
  instance.get("electronictraining/Examination/ResetExamination", {
    params
  });
//获取课程列表
export const getCourses = params =>
  instance.get("electronictraining/Course/GetCourses", { params });
// 获取课程信息
export const getCourseInfo = params =>
  instance.get("electronictraining/Course/GetCourseInfo", { params });
//用户登录
export const userLogin = params =>
  instance.get("electronictraining/UserInfo/Login", { params });
//获取用户信息
export const getUserInfo = params =>
  instance.get("electronicpolice/User/GetUserInfo", { params });
//用户注册
export const registerUser = params =>
  instance.post("electronicpolice/User/RegisterUser", params);
//获取签名
export const GetSignatureInfoByUrl = params =>
  instance.get("ElectronicPolice/user/GetSignatureInfoByUrl", { params });
//个人中心
export const GetUserInfoCenter = params =>
  instance.get("electronictraining/UserInfo/GetUserInfo", { params });
// 资源id
export const GetCourseWareInfo = params =>
  instance.get("/electronictraining/Course/GetCourseWareInfo", { params });
// 提交学习时间
export const UpdateUserCourseware = params =>
  instance.post("/electronictraining/Course/UpdateUserCourseware", params);
//用户注册
export const RegisterUser = params =>
  instance.post("electronicpolice/User/RegisterUser", params);
//最近学习
export const GetUserRecentCourses = params =>
  instance.get("/electronictraining/Course/GetUserRecentCourses", { params });
