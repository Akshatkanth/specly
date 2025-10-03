import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // <-- ensure this is set!
  withCredentials: false,
});

export default instance;
