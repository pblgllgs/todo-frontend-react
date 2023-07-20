import { apiClient } from "./ApiClient";

export const retrieveHelloWorldBean = async () => {
  return await apiClient.get(`/hello-world`);
};

export const retrieveHelloWorldPathVariable = (username) => {
  return apiClient.get(`/hello-world/path-variable/${username}`);
};