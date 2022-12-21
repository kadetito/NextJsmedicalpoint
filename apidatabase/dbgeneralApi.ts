import axios from "axios";

const dbgeneralApi = axios.create({
  baseURL: "/api",
});

export default dbgeneralApi;
