import axios from "axios";
const instance = axios.create({
  baseURL: "https://www.easy-mock.com/mock/5cf53d13a48c5b4da964d4f2/",
  timeout: 1000
});
instance.interceptors.response.use(
  res => res.data,
  err => {
    console.info(err);
  }
);
export const getList = () => instance.get("list");
