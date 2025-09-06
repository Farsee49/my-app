import { useState, useEffect } from "react";
import { getAllBooks } from "../axios/Books"; 
import {
    Box,
    Container,
    Typography,
    Button,
    IconButton,
    Card,
    CardContent,
    CardActions,
    CardMedia,
    TextField
} from '@mui/material';

export default function Books({ setSingleBook, navigate }) {
  const [books, setBooks] = useState([]);
  

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        console.log("Fetched books:", data.books);
        setBooks(data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
  
    <div>
      <h1>Books</h1>
    </div>
   
        <Box sx={{ flexGrow: 1 }}>
          <Button variant="contained" href="/new-book" sx={{ mb: 2 }}>
            Add New Book
          </Button>
          {books.map((book) => (
            <Card sx={{ border: "1px solid #ccc", width: "600px", display: "flex", marginBottom: "16px" }} key={book.id}>
              <CardMedia
                component="img"
                alt={book.title}
            sx={{
              borderRight: "1px solid #ccc",
              height: "fit-content",
              width: "300px"
            }}
            image={book.image_url}
          />
          <CardContent sx={{ flex: '1 0 auto', backgroundColor: '#386536ff' }}>
            <Typography onClick={ () => {
              setSingleBook(book);
              navigate(`/single-book/${book.id}`);
            }} variant="h5">{book.title}</Typography>
            <Typography variant="subtitle1">{book.author}</Typography>
            <Typography variant="body2" color="text.secondary">
              {book.published_year}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {book.genre}
            </Typography>
          </CardContent>
        </Card>
      ))}
      </Box>
    
    
    </>
  );
};
         