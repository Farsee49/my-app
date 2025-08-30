const express = require('express');
const booksRouter = express.Router();
const catchAsync = require('../../utils/catchAsync');
const { 
  createBook, 
  getAllBooks, 
  getBookById, 
  getBookByUserId 
      } = require('../db/models/books');

// Get all books
booksRouter.get('/', catchAsync(async (req, res, next) => {
  const books = await getAllBooks();
  if (!books || books.length === 0) {
    return res.status(404).json({
      message: 'No books found',
      success: false
    });
  }
  res.status(200).json({
    message: 'Books retrieved successfully',
    books: books,
    success: true
  });
}));

// Create a new book
booksRouter.post('/', catchAsync(async (req, res, next) => {
  console.log(req.body,"reqbody", req.session.user.id, "session");
  const { title, author, genre, published_year, image_url, users_id } = req.body;
      if (!title || !author || !genre ) {
        return res.status(400).json({ 
          message: 'Title, author and genre are required',
          error: 'Missing required fields',
          success: false
        });
      } else if (req.session.user.id !== req.body.users_id) {
        return res.status(403).json({
          message: 'You are not authorized to create this book',
          error: 'Unauthorized',
          success: false
        });
      } else {
        const newBook = await createBook(req.body);
        res.status(201).json({
          message: 'Book created successfully',
          newBook: newBook,
          success: true
        });
      }
  next();
}));

//Delete a book
booksRouter.delete('/:bookId', catchAsync(async (req, res, next) => {
  const { bookId } = req.params;
  const book = await getBookById(bookId);
  if (!book) {
    return res.status(404).json({
      message: 'Book not found',
      success: false
    });
  }
  if (req.session.user.id !== book.users_id) {
    return res.status(403).json({
      message: 'You are not authorized to delete this book',
      error: 'Unauthorized',
      success: false
    });
  }
  await deleteBook(book.id);
  res.status(204).json({
    message: 'Book deleted successfully',
    success: true
  });
}));

module.exports = booksRouter;