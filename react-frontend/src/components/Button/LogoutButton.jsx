import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutauthapi } from '../../api/axiosInstance'; // Import the logoutauthapi method
import { logout } from "../../features/auth/authSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = async () => {
    try {
      if (token) {
        // Use the logoutauthapi method
        await logoutauthapi(token);
        dispatch(logout()); // Clear Redux state
        localStorage.removeItem("token"); // Clear local storage
        navigate("/login", { replace: true }); // Redirect to login page
      }
    } catch (error) {
      console.error("Logout error:", error.response || error.message);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
