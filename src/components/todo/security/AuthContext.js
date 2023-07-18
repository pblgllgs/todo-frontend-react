import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username, password) => {
    if (username === "pblgllgs" && password === "pass") {
      setIsAuthenticated(true);
      Swal.fire("Bienvenido", "Inicio de sessión exitoso", "success");
      return true;
    } else {
      setIsAuthenticated(false);
      return false;
    }
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
        setIsAuthenticated(false);
        Swal.fire("Cerrando sesión!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("No has cerrado sesion", "", "info");
      }
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
