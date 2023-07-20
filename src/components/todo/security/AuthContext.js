import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";
import { clear } from "@testing-library/user-event/dist/clear";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  // const loginBasic = async (username, password) => {
  //   const baToken = "Basic " + window.btoa(username + ":" + password);
  //   try {
  //     const response = await executeBasicAuthenticationService(baToken);
  //     if (response.status === 200) {
  //       setIsAuthenticated(true);
  //       setUsername(username);
  //       setToken(baToken);
  //       Swal.fire("Bienvenido", "Inicio de sessión exitoso", "success");
  //       console.log(response);
  //       apiClient.interceptors.request.use((config) => {
  //         console.log("interceptor");
  //         config.headers.Authorization = baToken;
  //         return config;
  //       });
  //       return true;
  //     } else {
  //       clear();
  //       return false;
  //     }
  //   } catch (error) {
  //     Clear();
  //     console.log(error);
  //   }
  // };

  const login = async (username, password) => {
    try {
      const response = await executeJwtAuthenticationService(
        username,
        password
      );
      if (response.status === 200) {
        const jwtToken = "Bearer " + response.data.token;
        setIsAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);
        Swal.fire("Bienvenido", "Inicio de sessión exitoso", "success");
        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = jwtToken;
          return config;
        });
        return true;
      } else {
        clear();
        return false;
      }
    } catch (error) {
      Clear();
      console.log(error);
    }
  };

  const Clear = () => {
    setIsAuthenticated(false);
    setUsername(null);
    setToken(null);
  };

  const logout = () => {
    Swal.fire({
      title: "Seguro quieres cerrar sesión?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Cerrar",
      denyButtonText: `No cerrar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Clear();
        Swal.fire("Cerrando sesión!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("No has cerrado sesion", "", "info");
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
