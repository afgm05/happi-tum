import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import ItemCatalog from './pages/ItemCatalog';
import ErrorPage from './pages/ErrorPage';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Try from './pages/Try';
import Logout from './components/Logout';
import { UserProvider } from './UserContext';


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
              <Route path="/items" element={ <ItemCatalog /> }/>
              <Route path="/login" element={ <Login /> }/>
              <Route path="/logout" element={ <Logout /> }/>
              <Route path="/register" element={ <Register /> }/>
              <Route path="*" element={ <ErrorPage /> } />
              <Route path="/try" element={ <Try /> } />
          </Routes>    
        </Container>      
      </BrowserRouter>
    </UserProvider>
    
  );

}

export default App;
