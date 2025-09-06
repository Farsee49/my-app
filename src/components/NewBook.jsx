import { useState} from 'react';
import { createBook } from '../axios/Books';
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


export default function NewBook({ 
    user, 
    isLoggedIn, 
    setUser, 
    setIsLoggedIn, 
    setError, 
    setMessage, 
    navigate 
        }) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [publishedYear, setPublishedYear] = useState("");
    const [imageUrl, setImageUrl] = useState("");

            console.log('NewBook user prop:', user);

            const submitNewBook = async(e) => {
              try {
                e.preventDefault();            
                const newBook = {
                    title,
                    author,
                    genre,
                    published_year: publishedYear,
                    image_url: imageUrl,
                    users_id: user.id
                };

                const response = await createBook(newBook);
                console.log('Created book:', response);
                setMessage('Book created successfully!');
                navigate('/books');
              } catch (error) {
                console.error('Error creating book:', error);
              }
            };


   return (
        <>
      <Typography style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '10vh' }}
       variant="h4" component="h1" gutterBottom>
        Add Book
      </Typography>
      <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '20vh' }}
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <form onSubmit={submitNewBook}>
        <TextField
          type="text"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          type="text"
          label="Author"
          variant="outlined"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
    
      <br />
      <br />
       <TextField
             type="text"
             label="Genre"
             variant="outlined"
             value={genre}
             onChange={(e) => setGenre(e.target.value)}
             required
          />
          <br />
          <br />
       <TextField
          type="integer"
          label="Published Year"
          variant="outlined"
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value)}
          required
        />
      <br />
      <br />
      <TextField
          type="text"
          label="Image URL"
          variant="outlined"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      <br />
      <br />
      
        
      <Button  type="submit" variant="contained" color="primary" >
        Add Book
      </Button>
      </div>
        </form>
      </div>
     
    </Box>

  </>);
}