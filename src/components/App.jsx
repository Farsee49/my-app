
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { Box, Container, Typography, Card } from '@mui/material';
import { 
  Navbar,
  Home,
  Register,
  Login,
  Books,
  NewBook,
  SingleBook,
  UpdateBook
} from './index';
 import { getUserMe } from '../axios/Users';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';





    export default function App() {
      const navigate = useNavigate();
      const [user, setUser] = useState(null);
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [isAuth, setIsAuth] = useState(false);
      const [error, setError] = useState(null);
      const [message, setMessage] = useState(null);
      const [loading, setLoading] = useState(false);
      const [singleBook, setSingleBook] = useState(null);

                              console.log('App user state top:', user);

     

      useEffect(() => {
        const fetchCurrentUser = async () => {
          setLoading(true);
          try {
            const response = await getUserMe();
            console.log('Fetched user in App.jsx useEffect:', response);
            setUser(response.user);
            setIsLoggedIn(true);
            setIsAuth(true);
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
        fetchCurrentUser();
      }, []);
                        console.log('App user state bottom:', user);
      return (
        <>
            <div>
              <Navbar
               user={user}
               isLoggedIn={isLoggedIn}
               setUser={setUser}
               setIsLoggedIn={setIsLoggedIn}
               setError={setError}
               setMessage={setMessage}
               navigate={navigate}
              />
            </div> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register
               setUser={setUser}
               setIsLoggedIn={setIsLoggedIn}
               setError={setError}
               setMessage={setMessage}
               navigate={navigate}
               error={error}
               message={message}
              />} />
              <Route path="/login" element={<Login
               setUser={setUser}
               setIsLoggedIn={setIsLoggedIn}
               setError={setError}
               setMessage={setMessage}
               navigate={navigate}
               error={error}
               message={message}
              />} />
              <Route path="/books" element={<Books
                user={user}
                isLoggedIn={isLoggedIn}
                setUser={setUser}
                setIsLoggedIn={setIsLoggedIn}
                setError={setError}
                setMessage={setMessage}
                navigate={navigate}
                setSingleBook={setSingleBook}
                singleBook={singleBook}
                isAuth={isAuth}
              />} />
              <Route path="/new-book" element={<NewBook
                user={user}
                isLoggedIn={isLoggedIn}
                setUser={setUser}
                setIsLoggedIn={setIsLoggedIn}
                setError={setError}
                setMessage={setMessage}
                navigate={navigate}
              />} />
              <Route path="/single-book/:id" element={<SingleBook
                user={user}
                isLoggedIn={isLoggedIn}
                setUser={setUser}
                setIsLoggedIn={setIsLoggedIn}
                setError={setError}
                setMessage={setMessage}
                navigate={navigate}
                singleBook={singleBook}
                setSingleBook={setSingleBook}
                isAuth={isAuth}
              />} />
              <Route path="/update-book/:id" element={<UpdateBook
                user={user}
                isLoggedIn={isLoggedIn}
                setUser={setUser}
                setIsLoggedIn={setIsLoggedIn}
                setError={setError}
                setMessage={setMessage}
                navigate={navigate}
                singleBook={singleBook}
                setSingleBook={setSingleBook}
                isAuth={isAuth}
              />} />
            </Routes>
        </>
      );
    }