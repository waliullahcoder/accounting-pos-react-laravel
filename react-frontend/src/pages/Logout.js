// import React, { useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { logout } from "../features/auth/authSlice";

// const Logout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token, isSuperAdmin } = useSelector((state) => state.auth); // Retrieve isSuperAdmin from Redux state
//   const hasLoggedOut = useRef(false); // Ref to track logout execution

//   useEffect(() => {
//     const handleLogout = async () => {
//       if (hasLoggedOut.current || !token) return; // Prevent multiple calls

//       hasLoggedOut.current = true; // Mark as executed

//       try {
//         // Log the token for debugging
//         console.log("Token:", token);

//         // Call the logout API if the token exists
//         await axios.post(
//           "http://localhost:8000/api/auth/logout",
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         // Clear the Redux state
//         dispatch(logout());
//         localStorage.removeItem("token");

//         // Redirect to login
//         navigate("/login", { replace: true });
//       } catch (error) {
//         console.error("Logout error:", error.response || error.message);
//         alert("An error occurred while logging out. Please try again.");

//         // Redirect back to the appropriate dashboard if logout fails
//         const redirectPath = isSuperAdmin ? "/admin" : "/dashboard";
//         navigate(redirectPath, { replace: true });
//       }
//     };

//     handleLogout(); // Trigger the logout process
//   }, [token, isSuperAdmin, dispatch, navigate]); // Include isSuperAdmin in dependency array

//   return (
//     <div>
//       <h2>Logging Out...</h2>
//     </div>
//   );
// };

// export default Logout;
