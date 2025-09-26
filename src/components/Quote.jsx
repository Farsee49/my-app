import { getQuote } from "../axios/Quote"
import { useState, useEffect, Fragment } from 'react';

export default function Quote() {
    const [quote, setQuote] = useState([]);

    const fetchQuote = async () => {
        const response = await getQuote();
        if (response && response.data) {
            console.log(response.data);
            setQuote(response.data);
        }
    }
    useEffect(() => {
        Promise.all([fetchQuote()])
            .then(() => {
                console.log('Quote fetched successfully');
            })
            .catch((error) => {
                console.error('Error fetching quote:', error);
            });
    }, []);

    

    return (
        <>
            <h2>Quote of the Day</h2>
            <blockquote>
               {quote.map(quotes => 
                <Fragment key={quotes._id}>
                <h3>{quotes.content}</h3>
                <p> {quotes.author}</p>
                </Fragment> 
               )}
                
            </blockquote>

        </>
    )
}