import axios from "axios";
const instance = axios.create({
  baseURL: "https://www.easy-mock.com/mock/5cf53d13a48c5b4da964d4f2/",
  timeout: 1000
});

export const getList = () => instance.get("list");
