import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { retrieveHelloWorldPathVariable } from "./api/HelloWorldApiService";
import { useAuth } from "./security/AuthContext";

export const WelcomeComponent = () => {
  const { username } = useParams();

  const [message, setMessage] = useState(null);

  const {token} = useAuth()

  const callHelloWorld = () => {
    retrieveHelloWorldPathVariable("pblgllgs",token)
      .then((response) => susResponse(response))
      .catch((error) => errResponse(error))
      .finally(() => console.log("cleanup"));
  };

  const susResponse = (response) => {
    console.log(response);
    setMessage(response.data.message);
  };
  const errResponse = (response) => {
    console.log(response);
  };

  return (
    <div className="WelcomeComponent">
      <h1>Welcome to {username}</h1>
      <div>
        Manage yours todos - <Link to="/todos">Go here!</Link>
      </div>
      <button className="btn btn-success m-5" onClick={callHelloWorld}>
        Call the API REST
      </button>
      <div className="text-info">{message}</div>
    </div>
  );
};
