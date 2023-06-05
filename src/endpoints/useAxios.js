import { useState } from "react";
import { axiosInstance } from "./api";

export const REQ_TYPES = Object.freeze({
  POST: "post",
  GET: "get",
  PUT: "put",
  DELETE: "delete",
});

const useAxios = (initialValue = []) => {
  // response data'nın tutulacağı state
  const [data, setData] = useState(initialValue);
  // istek başladıktan sonra cevap gelene kadar true olur
  // const [loading, setLoading] = useState(false);
  // // Response error datasının tutulacağı state
  // const [error, setError] = useState();

  const doRequest = ({ endpoint, reqType, payload }) => {
    return axiosInstance[reqType](endpoint, payload)
      .then((res) => {
        setData(res.data);
        return res.data;
      })
      .catch((err) => {
        setData(initialValue);
        throw err;
      })
      .finally(() => {});
  };

  return [doRequest, data];
};

export default useAxios;
