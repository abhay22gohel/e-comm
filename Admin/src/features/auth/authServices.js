import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
let token;
const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

token = getTokenFromLocalStorage.token;
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // console.log(error);
  }
);

const login = async (user) => {
  const response = await axiosInstance.post(
    `${base_url}user/admin-login`,
    user
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const getOrders = async (data) => {
  const response = await axiosInstance.get(
    `${base_url}user/getallorders`,
    data
  );

  return response.data;
};
const getOrder = async (id) => {
  const response = await axiosInstance.get(
    `${base_url}user/getaOrder/${id}`,

    config
  );

  return response.data;
};

const updateOrder = async (data) => {
  const response = await axiosInstance.put(
    `${base_url}user/updateOrder/${data.id}`,
    { status: data.status },
    config
  );

  return response.data;
};

const getMonthlyOrders = async (data) => {
  const response = await axiosInstance.get(
    `${base_url}user/getMonthWiseOrderIncome`,

    data
  );

  return response.data;
};

const getYearlyStats = async (data) => {
  const response = await axiosInstance.get(
    `${base_url}user/getyearlyorders`,

    data
  );

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  getMonthlyOrders,
  getYearlyStats,
  updateOrder,
};

export default authService;
