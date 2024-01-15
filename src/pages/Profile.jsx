import { useContext } from "react";
import { AppContext } from "../main";
import { Navigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const { user, isAuthenticated } = useContext(AppContext);
  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return (
    <>
      <div className="profile">
        <div id="user_name">
          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
        </div>
        <div id="user_profile">
          <img src={user.profile} alt="myprofile" />
          <h1>Your Profile Picture</h1>
        </div>
      </div>
    </>
  );
};
export default Profile;
