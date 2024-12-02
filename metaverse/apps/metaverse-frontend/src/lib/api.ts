import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const customAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await generateRefreshToken();
        return customAxios(originalRequest);
      } catch (refreshError) {
        console.log("Token refresh failed:", refreshError);
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  },
);

export const generateRefreshToken = async () => {
  try {
    await customAxios.get(`/generate-token`);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
