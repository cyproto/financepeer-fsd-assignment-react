import axios from "axios";
import { baseUrl } from "./api.config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};

export const loginUser = (data) => {
  return axios.post(`${baseUrl}/login/`, data, { headers: headers });
};

export const signupUser = (data) => {
  return axios.post(`${baseUrl}/signup/`, data, { headers: headers });
};

export const validateToken = () => {
  return axios.post(
    `${baseUrl}/validate-token/`,
    {},
    {
      headers: {
        ...headers,
        Authorization: `Bearer ${window.sessionStorage.getItem("auth_token")}`,
      },
    }
  );
};

export const changePassword = (password) => {
  return axios.post(
    `${baseUrl}/change-password/`,
    { password },
    {
      headers: {
        ...headers,
        Authorization: `Bearer ${window.sessionStorage.getItem("auth_token")}`,
      },
    }
  );
};

export const uploadData = (data) => {
  return axios.post(`${baseUrl}/user-data/`, data, {
    headers: {
      ...headers,
      Authorization: `Bearer ${window.sessionStorage.getItem("auth_token")}`,
    },
  });
};

export const getUserData = (id = null) => {
  const apiUrl = "/user-data/" + (id ? `?id=${id}` : "");
  return axios.get(baseUrl + apiUrl, {
    headers: {
      ...headers,
      Authorization: `Bearer ${window.sessionStorage.getItem("auth_token")}`,
    },
  });
};
