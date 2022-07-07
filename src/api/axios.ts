import axios from 'axios';

export const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Accept: 'application/json'
    };

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
