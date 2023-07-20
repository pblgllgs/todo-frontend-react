import "./TodoApp.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LogoutComponent } from "./LogoutComponent";
import { FooterComponent } from "./FooterComponent";
import { HeaderComponent } from "./HeaderComponent";
import { ListTodosComponent } from "./ListTodosComponent";
import { WelcomeComponent } from "./WelcomeComponent";
import { ErrorComponent } from "./ErrorComponent";
import { LoginComponent } from "./LoginComponent";
import { AuthProvider, useAuth } from "./security/AuthContext";
import { TodoComponent } from "./TodoComponent";

const AuthenticatedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return children;
  }
  return <Navigate to="/" />;
};

export const TodoApp = () => {
  return (
    <div className="TodoApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route element={<LoginComponent />} path="/" />
            <Route element={<LoginComponent />} path="/login" />

            <Route
              element={
                <AuthenticatedRoute>
                  <WelcomeComponent />
                </AuthenticatedRoute>
              }
              path="/welcome/:username"
            />

            <Route
              element={
                <AuthenticatedRoute>
                  <ListTodosComponent />
                </AuthenticatedRoute>
              }
              path="/todos"
            />
            <Route
              element={
                <AuthenticatedRoute>
                  <LogoutComponent />
                </AuthenticatedRoute>
              }
              path="/logout"
            />

            <Route
              element={
                <AuthenticatedRoute>
                  <TodoComponent />
                </AuthenticatedRoute>
              }
              path="/todo/:id"
            />

            <Route element={<ErrorComponent />} path="/*" />
          </Routes>
          <FooterComponent />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};
