
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


export default function SingleBook({ 
  singleBook, 
  user, 
  isLoggedIn, 
  setUser, 
  setIsLoggedIn, 
  setError , 
  setMessage, 
  navigate 
}) {
  return (
    <>

      <Box sx={{ flexGrow: 1, p: 2 }}>

            <Card sx={{ border: "1px solid #ccc", width: "600px", display: "flex", marginBottom: "16px" }} >
              <CardMedia
                component="img"
                alt={singleBook.title}
            sx={{
              borderRight: "1px solid #ccc",
              height: "fit-content",
              width: "300px"
            }}
            image={singleBook.image_url}
          />
          <CardContent sx={{ flex: '1 0 auto', backgroundColor: '#386536ff' }}>
            <Typography  variant="h5">{singleBook.title}</Typography>
            <Typography variant="subtitle1">{singleBook.author}</Typography>
            <Typography variant="body2" color="text.secondary">
              {singleBook.published_year}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {singleBook.genre}
            </Typography>
           {singleBook.users_id === user.id ? (
             <Button sx={{ mt: 2, marginLeft: "16px" }} variant="contained" color="primary" onClick={() => navigate(`/update-book/${singleBook.id}`)} target="_blank" rel="noopener">
               Update Book
             </Button>
           ) : null}
          </CardContent>
        
        </Card>

      </Box>
      </>
      )
}
