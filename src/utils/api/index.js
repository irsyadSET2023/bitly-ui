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

export const getAllLinks = (token) => {
  return axios.get(`${BASE_URL}/api/link`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addLink = (token, data) => {
  return axios.post(`${BASE_URL}/api/link`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editLink = (token, data) => {
  return axios.put(`${BASE_URL}/api/link`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteLink = (token, data) => {
  return axios.delete(`${BASE_URL}/api/link`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
};
