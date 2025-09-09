import { useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { updateBookById } from '../axios/Books';
 



export default function UpdateBook({ singleBook, navigate, user }) {
  console.log("singleBook in UpdateBook component:", singleBook, "user:", user);
      const { bookId } = useParams();
      const [title, setTitle] = useState("");
      const [author, setAuthor] = useState("");
      const [genre, setGenre] = useState("");
      const [publishedYear, setPublishedYear] = useState("");
      const [imageUrl, setImageUrl] = useState("");

        const handleSubmit = async (e) => {
          try {
            e.preventDefault();

            const updatedBook = {
              title,
              author,
              genre,
              published_year : publishedYear,
              image_url : imageUrl,
              users_id: user.id
            };

            const response = await updateBookById(singleBook.id, updatedBook);
            console.log("Updated book response:", response);
            navigate('/books');

            // Implement the logic to update the book details here
            console.log("Update book details submitted");
          } catch (error) {
            console.error("Error updating book details:", error);
          }
        };
  return (
        <>

      <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                  Update Book
              </Typography>
        <Box component="form" 
            noValidate 
            autoComplete="off" 
            onSubmit={handleSubmit} 
            sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
              type="text"
              label="Title"
              variant="outlined"
              placeholder={singleBook.title}
              // value={singleBook.title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
            sx={{ mt: 2 }}
              type="text"
              label="Author"
              variant="outlined"
              placeholder={singleBook.author}
              // value={singleBook.author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <TextField
             sx={{ mt: 2 }}
              type="text"
              label="Genre"
              variant="outlined"
              placeholder={singleBook.genre}
              // value={singleBook.genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />  
            <TextField
              sx={{ mt: 2 }}
              type="text"
              label="Published Year"
              variant="outlined"
              // value={singleBook.published_year}
              placeholder={singleBook.published_year}
              onChange={(e) => setPublishedYear(e.target.value)}
              required
            />
            <TextField
              sx={{ mt: 2, mb: 2 }}
              type="text"
              label="Image URL"
              variant="outlined"
              placeholder={singleBook.image_url}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />

            
              <Button sx={{ mb: 5 }} type="submit" variant="contained" color="primary">
                Update Book
              </Button>
            
        </Box>
    </Card>
  </>);
}