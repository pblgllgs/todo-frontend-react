import { useState } from "react";
import { ErrorMessageComponent } from "./ErrorMessageComponent";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export const LoginComponent = () => {
  const [form, setForm] = useState({ username: "pblgllgs", password: "password" });
  const [showErrMessage, setShowErrMessage] = useState(false);
  const { username, password } = form;

  const { login } = useAuth();

  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await login(username, password)) {
      navigate(`/welcome/${username}`);
    } else {
      setShowErrMessage(true);
    }
  };

  return (
    <>
      <div className="Login">
        <h1>Time to login</h1>
        {showErrMessage && <ErrorMessageComponent />}

        <form className="LoginForm" onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label className="form-label mx-3">Username: </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label mx-3">Password: </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <button type="submit" name="login" onSubmit={handleSubmit}>
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
