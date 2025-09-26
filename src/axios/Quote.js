import axios from 'axios';


export async function getQuote() {
    const quoteUrl = 'http://api.quotable.io/quotes/random';
    
    try{
      const response = await axios.get(quoteUrl, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      );
     console.log(response.data);
      return response;
    } catch (error) {
      console.error(error);
    }
  }