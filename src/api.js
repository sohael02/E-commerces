import axios from "axios";

const api = axios.create({
  baseURL: "http://10.1.152.30:5000/api",
});

export default api;