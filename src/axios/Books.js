import axios from 'axios';






//Get all books
export const getAllBooks = async () => {
    try {
        const response = await axios.get('http://localhost:4646/api/books');
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};


//Create a new book
export const createBook = async (newBook) => {
    console.log('Creating book:', newBook);
    try {
        const response = await axios.post('http://localhost:4646/api/books', newBook, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error creating book:', error);
        throw error;
    }
};

//Get a single book by ID
export const getBookById = async (bookId) => {
    try {
        const response = await axios.get(`http://localhost:4646/api/books/${bookId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching book with ID ${bookId}:`, error);
        throw error;
    }
};

//Update a book by ID
export const updateBookById = async (bookId, updatedBook) => {
    try {
        const response = await axios.put(`http://localhost:4646/api/books/${bookId}`, updatedBook, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(`Error updating book with ID ${bookId}:`, error);
        throw error;
    }
};

//Delete a book by ID
export const deleteBookById = async (bookId) => {
    try {
        const response = await axios.delete(`http://localhost:4646/api/books/${bookId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(`Error deleting book with ID ${bookId}:`, error);
        throw error;
    }
}