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