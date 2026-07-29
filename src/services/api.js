import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.2.194:3000",
  timeout: 30000,
});
