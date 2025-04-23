import axios, { CreateAxiosDefaults } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const baseURL = API_BASE_URL;
const client = axios.create({
  baseURL: baseURL,
});

type Headers = CreateAxiosDefaults<any>["headers"];

export const getClient = async (headers?: Headers) => {
  const defaultHeaders = {
    ...headers,
  };

  return axios.create({ baseURL, headers: defaultHeaders });
};

export default client;
