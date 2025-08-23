import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components'; // Importing the App component from components directory
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
// import './style/index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <StrictMode>
    <App />
    </StrictMode>
  </BrowserRouter>
);