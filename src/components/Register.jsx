
import { useState } from "react";
import { registerUser } from "../axios/Users";
import { Container, Typography, TextField, Button, Box } from "@mui/material";



export default function Register({ 
    setUser, 
    setIsLoggedIn, 
    setError, 
    setMessage,
    navigate,
    error,
    message 
                }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

 const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const user = {
                username,
                password
            };
            const response = await registerUser(user);
            console.log(response, "response in Register.jsx");
            
            if (response.success === true) {
                setUser(response.user);
                setIsLoggedIn(true);
                setMessage(response.message);
                setError("");
                navigate("/login");
            } else {
                setError(response.error);
                setMessage("");
            }
        } catch (err) {
            console.error("Registration error:", err);
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <>
      <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}
       variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}
         
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
      <div>
        <form onSubmit={handleRegister}>
        <TextField
          type="text"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <br />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button  type="submit" variant="contained" color="primary" >
        Register
      </Button>
      </div>
        </form>
      </div>
     
    </Box>

  </>);
}























