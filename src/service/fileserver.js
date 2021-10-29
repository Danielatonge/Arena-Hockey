import axios from "axios";

const fileApi = axios.create({
  baseURL: "https://file-hockey.herokuapp.com",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default {
  getFile() {
    return fileApi.get(`/files`);
  },
  postFile(formData) {
    return fileApi.post(`/file/upload`, formData);
  },
};
