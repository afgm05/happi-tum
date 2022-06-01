import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import ItemCatalog from './pages/ItemCatalog';
import ErrorPage from './pages/ErrorPage';
import { UserProvider } from './UserContext';


function App() {
  
  return (  

      <BrowserRouter>
        <Container fluid>
          <Routes>
              <Route path="/" element={ <Home /> }/>
              <Route path="/items" element={ <ItemCatalog /> }/>
              <Route path="*" element={ <ErrorPage /> } />
          </Routes>    
        </Container>      
      </BrowserRouter>
    
  );

}

export default App;
