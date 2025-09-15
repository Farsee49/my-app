
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
import { deleteBookById } from '../axios/Books';


export default function DeleteBook({ singleBook, setSingleBook, isAuth, navigate }) {
  const handleDelete = async () => {
    try {
      await deleteBookById(singleBook.id);
      setSingleBook(null);
      navigate('/books');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
   <>
       <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
              <Typography variant="h3" component="h1" gutterBottom>
                  Are you sure you want to delete this book?
              </Typography>
        <Box component="form" 
            noValidate 
            autoComplete="off"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', mb: 2, mt: 2 }}
        >
       
            <Button 
                variant="contained" 
                color="error" 
                onClick={handleDelete} 
            >
                Confirm Delete
            </Button>
        </Box>
       </Card>  
   </>
  )
}