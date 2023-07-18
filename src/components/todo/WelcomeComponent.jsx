import { Link, useParams } from "react-router-dom";

export const WelcomeComponent = () => {
  const { username } = useParams();
  return (
    <div className="WelcomeComponent">
      <h1>Welcome to {username}</h1>
      <div>
        Manage yours todos - <Link to="/todos">Go here!</Link>
      </div>
    </div>
  );
};
