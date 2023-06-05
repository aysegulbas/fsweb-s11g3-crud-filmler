import axios from "axios";

export const axiosCreate = () => {
  return axios.create({
    baseURL: "http://localhost:9000/api/",
  });
};

export let axiosInstance = axiosCreate();
