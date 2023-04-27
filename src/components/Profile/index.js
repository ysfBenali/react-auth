import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${cookies?.token}`
            }
          }
        );
        setProfileData(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    if (cookies?.token === "undefined" || !cookies?.token) {
      navigate("/login");
    } else fetchData();
  }, [cookies.token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    {!isLoading ?
      (
      <>
        <h1 className="text-3xl font-bold mb-8">Welcome back !</h1>
        <p className="text-lg mb-2">Username: {profileData.username}</p>
        <p className="text-lg mb-8">Email: {profileData.email}</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Logout
        </button>
      </>
      ):
      "loading . . ."
    }
    </div>
  );
};

export default Profile;
