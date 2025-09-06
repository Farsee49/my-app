const express = require('express');
const usersRouter = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
require('../../utils/passport-config')(passport);
const { createUser, getUserByUsername } = require('../db/models/users');
const catchAsync = require('../../utils/catchAsync');

usersRouter.post('/register', catchAsync(async (req, res, next) => {
    console.log('Registering a new user');
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send({
            error: 'Username and password are required',
            name: 'MissingCredentialsError',
            message: 'Please provide both username and password'

        });
    } else if (password.length < 5) {
        res.status(400).send({
            error: 'Password too short',
            name: 'PasswordLengthError',
            message: 'Password must be at least 8 characters long'
        });
    } else {
        const user = await getUserByUsername(username);
        if (user) {
            res.status(400).send({
                error: 'User already exists',
                name: 'UserExistsError',
                message: 'Please choose a different username'
            });
        } else {
            const newUser = await createUser({ username, password });
            //const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1w' });
            res.send({
                user: newUser,
                message: 'User created successfully',
                //token,
                success: true
            });
        }
    }
}));

usersRouter.post('/login', passport.authenticate('local'), catchAsync(async(req, res) => {
    console.log('User logged in:', req.user);
    req.session.user = req.user;
    res.status(200).json({ 
        message: 'Login successful',
        user: req.user,
        success: true
    });
}));


usersRouter.get('/me', (req, res) => {
  if (req.session.user) {
    return res.json({ 
                    user: req.session.user,
                    success: true
                    });
  }
  res.status(401).json({ user: null });
});

usersRouter.get('/logout', (req, res) => {
    console.log('User logged out');
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed', error: err });
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Session destruction failed', error: err });
            }
            res.status(200).json({ message: 'Logout successful' });
        });
    });
});






module.exports = usersRouter;