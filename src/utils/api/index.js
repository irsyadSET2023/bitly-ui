import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const postRegisterUser = async (data) => {
  return axios.post(`${BASE_URL}/api/register`, data).then((res) => res.data);
};

export const postLoginUser = async (data) => {
  return axios.post(`${BASE_URL}/api/login`, data).then((res) => res.data);
};

export const getUserId = (token) => {
  return axios.get(`${BASE_URL}/api/protected`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
