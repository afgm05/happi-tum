import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import UserContext from '../UserContext';

export default function NavBar() {

	const { user } = useContext(UserContext);

	return (
		<>
		  <Navbar expand="lg" className='navbar'>
		      <Container>
		        <Navbar.Brand as={Link} to="/">
		        	<p className="greet1">Have a <span className="greet2">HappiTum!</span></p>
		        	<p className="greet3">Get food develired to your doorstep.</p>
		        </Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
		              <Nav className="ms-auto">
		                <Nav.Link  as={Link} to="/" className="navlink">Home</Nav.Link>
		                {
		                	(user.accessToken !== null && user.isAdmin === true) ?
    	                	<>
    		                	<Nav.Link as={Link} to="/admin" className="navlink">Admin Dashboard</Nav.Link>
    		                	<Nav.Link as={Link} to="/logout" className="navlink">Logout</Nav.Link>
    		                </>
    		                :
		                	(user.accessToken !== null) ?
		                	<>
			                	<Nav.Link as={Link} to="/cart" className="navlink">Cart</Nav.Link>
			                	<Nav.Link as={Link} to="/history" className="navlink">History</Nav.Link>
			                	<Nav.Link as={Link} to="/logout" className="navlink">Logout</Nav.Link>
			                </>
		                	:
		                	<>
		                		<Nav.Link as={Link} to="/login" className="navlink">Login</Nav.Link>
		                		<Nav.Link as={Link} to="/register" className="navlink">Register</Nav.Link>

		                	</>
		                }
		               
		              </Nav>
		            </Navbar.Collapse>
		      </Container>
		   </Navbar>
		</>
	);
}