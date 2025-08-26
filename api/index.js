

const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');

router.use('/users', usersRouter);
router.use('/books', booksRouter);

module.exports = router;