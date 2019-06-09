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
export const getList = () => instance.get("list");
//获取课程列表
export const getCourses = params =>
  instance.get("electronictraining/Course/GetCourses", { params });
// 获取课程信息
export const getCourseInfo = params =>
  instance.get("electronictraining/Course/GetCourseInfo", { params });
//用户登录
export const userLogin = params =>
  instance.get("electronicpolice/User/Login", { params });
//获取用户信息
export const getUserInfo = params =>
  instance.get("electronicpolice/User/GetUserInfo", { params });
//用户注册
export const registerUser = params =>
  instance.post("electronicpolice/User/RegisterUser", params);
//获取签名
export const GetSignatureInfoByUrl = params =>
  instance.get("ElectronicPolice/user/GetSignatureInfoByUrl", { params });
