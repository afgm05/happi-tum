import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { UserProvider } from './UserContext';

import './App.css';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Logout from './components/Logout';
import Register from './pages/Register';
import ProductCatalogByStore from './pages/ProductCatalogByStore';
import Product from './pages/ProductPage';
import Cart from './pages/Cart';
import ErrorPage from './pages/ErrorPage';


function App() {
  
  const [ user, setUser ] = useState({
      accessToken: localStorage.getItem('accessToken'),
      isAdmin: localStorage.getItem('isAdmin') === 'true'
  })

  const unsetUser = () => {
      localStorage.clear();
  }

  return (  
    <UserProvider value = {{ user, setUser, unsetUser }} >
      <BrowserRouter>
        <Container fluid>
          <NavBar />
          <Routes>
              <Route path="/" element={ <Home /> }/>
              <Route path="/login" element={ <Login /> }/>
              <Route path="/logout" element={ <Logout /> }/>
              <Route path="/register" element={ <Register /> }/>
              <Route path="/catalog" element={ <ProductCatalogByStore /> }/>
              <Route path="/product" element={ <Product /> }/>
              <Route path="/cart" element={ <Cart /> }/>
              <Route path="*" element={ <ErrorPage /> } />
          </Routes>    
        </Container>      
      </BrowserRouter>
    </UserProvider>  
  );

}

export default App;
