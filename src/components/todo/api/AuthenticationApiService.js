import { apiClient } from "./ApiClient";

export const executeBasicAuthenticationService = () => {
  return apiClient.get(`/basicauth`);
};

export const executeJwtAuthenticationService = (username, password) => {
  return apiClient.post(`/authenticate`, {
    username,
    password,
  });
};
