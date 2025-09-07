import { useState } from 'react';
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
 



export default function UpdateBook({ singleBook, navigate, user }) {
  console.log("singleBook in UpdateBook component:", singleBook, "user:", user);

      const [title, setTitle] = useState("");
      const [author, setAuthor] = useState("");
      const [genre, setGenre] = useState("");
      const [publishedYear, setPublishedYear] = useState("");
      const [imageUrl, setImageUrl] = useState("");

        const handleSubmit = async (e) => {
            e.preventDefault();
            // Implement the logic to update the book details here
            console.log("Update book details submitted");
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
              value={singleBook.title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
            sx={{ mt: 2 }}
              type="text"
              label="Author"
              variant="outlined"
              value={singleBook.author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <TextField
             sx={{ mt: 2 }}
              type="text"
              label="Genre"
              variant="outlined"
              value={singleBook.genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />  
            <TextField
              sx={{ mt: 2 }}
              type="text"
              label="Published Year"
              variant="outlined"
              value={singleBook.published_year}
              onChange={(e) => setPublishedYear(e.target.value)}
              required
            />
            <TextField
              sx={{ mt: 2, mb: 2 }}
              type="text"
              label="Image URL"
              variant="outlined"
              value={singleBook.image_url}
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