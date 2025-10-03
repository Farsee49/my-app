import { useEffect } from 'react';
import { getCurrentWeather, getWeatherForecast } from '../axios/Weather';
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

export default function Weather() {
 
return (
    <>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Card sx={{ backgroundColor: 'rgb(63, 74, 78)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Weather Component
                </Typography>
                <CardContent>
                    <Typography variant="body1">
                        This is where the weather information will be displayed.
                    </Typography>
                    <CardActions component="form"
                        noValidate
                        autoComplete="off"
                        sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
                    >
                        <TextField
                            label="Enter Location"
                            variant="outlined"
                            sx={{ mb: 2, width: '100%' }}
                        />
                        <Button variant="contained" color="primary">
                            Get Weather
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Container>    
    </>
)
  
}