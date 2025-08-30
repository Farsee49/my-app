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