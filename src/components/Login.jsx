
import {
    Box,
    Container,
    Typography,
    Button,
    IconButton,
    Card,
    CardContent,
    CardActions,
    TextField
} from '@mui/material';
import { useState } from "react";
import { loginUser } from "../axios/Users";
export default function Login({
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
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const _user = {
                username,
                password
            };
            const response = await loginUser(_user);
            setUser(response.user);
            setIsLoggedIn(true);
            setMessage("Login successful!");
            navigate("/");
            setError("");
            setMessage("");
        } catch (error) {
            console.error("Login error:", error);
            setError("Login failed. Please try again.");
        }
    };
    return (
        <>
      <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}
       variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}
         
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
      <div>
        <form onSubmit={handleLogin}>
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
        Login
      </Button>
      </div>
        </form>
      </div>
     
    </Box>

  </>);
}


