const pool = require('../pool');




const createBook = async ({ title, author, genre, published_year, image_url, users_id }) => {
  try {
    const query = `
      INSERT INTO books (title, author, genre, published_year, image_url, users_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [title, author, genre, published_year, image_url, users_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

const getAllBooks = async () => {
  try {
    const query = `
      SELECT * FROM books
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

const getBookById = async (id) => {
  try {
    const query = `
      SELECT * FROM books WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    throw error;
  }
};

const getBookByUserId = async (userId) => {
  try {
    const query = `
      SELECT * FROM books WHERE users_id = $1
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching books by user ID:', error);
    throw error;
  }
};

const deleteBook = async (id) => {
  try {
    const query = `
      DELETE FROM books WHERE id = $1
    `;
    await pool.query(query, [id]);
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    getBookByUserId,
    deleteBook
}