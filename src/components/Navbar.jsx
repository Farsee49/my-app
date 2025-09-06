import { Link } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton
} from '@mui/material';
import { Logout } from './index';
//import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar({ user, isLoggedIn, setUser, setIsLoggedIn, setError, setMessage, navigate }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            🎲 
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CF
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome {user ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : 'Guest'}
          </Typography>
          {isLoggedIn ? (
            <>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/books">
                Books
            </Button>
            <Logout
              setUser={setUser}
              setIsLoggedIn={setIsLoggedIn}
              setError={setError}
              setMessage={setMessage}
              navigate={navigate}
              user={user}
            />
            </>
          ) : (
            <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
