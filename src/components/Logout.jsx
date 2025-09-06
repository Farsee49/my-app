
import {
    Typography,
    Button,
} from '@mui/material';


import { logoutUser } from '../axios/Users';




export default function Logout({ setUser, setIsLoggedIn, setError, setMessage, navigate, user }) {
  const handleLogout = async () => {
    console.log("Logging out user:", user);
    try {
      const response = await logoutUser();
        console.log(response, "response in Logout.jsx");

      setUser(null);
      setIsLoggedIn(false);
      setError(null);
      setMessage("You have successfully logged out.");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setError("Logout failed. Please try again.");
    }
  };

  return (

      <Button onClick={handleLogout} color="inherit">Logout</Button>

  );
}