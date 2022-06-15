import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import UserContext from '../UserContext';
import { FaUserCircle, FaHome, FaShoppingCart } from "react-icons/fa";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { RiFileListLine } from "react-icons/ri";
import { GiArchiveRegister } from "react-icons/gi";


export default function NavBar() {

	const { user } = useContext(UserContext);
	

	return (
		<>
		  <Navbar expand="lg" className='navbar shadow-sm' style={{backgroundColor: "#FAEBD7"}}>
		      <Container>

		        <Navbar.Brand as={Link} to="/">
		        	<p className="greet1">Have a <span className="greet2">HappiTum!</span></p>
		        	<p className="greet3">Get food develired to your doorstep.</p>
		        </Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
		              <Nav className="ms-auto">
		                {
		                	(user.accessToken !== null && user.isAdmin === true) ?
    	                	<>
    	                		<Nav.Link  as={Link} to="/" className="navlink">Customer's View</Nav.Link>
    		                	<Nav.Link as={Link} to="/admin" className="navlink">Admin Dashboard</Nav.Link>
    		                	<Nav.Link as={Link} to="/logout" className="navlink">Logout</Nav.Link>
    		                </>
    		                :
		                	(user.accessToken !== null) ?		
		                	<>	
		                		<Nav.Link  as={Link} to="/" className="navlink">
		                			<FaHome /><span className="ps-1">Home</span>
		                		</Nav.Link>
			                	<Nav.Link as={Link} to="/cart" className="navlink">
			                		<FaShoppingCart /><span className="ps-1">Cart</span>
			                	</Nav.Link>
			                	<Nav.Link as={Link} to="/history" className="navlink">
			                		<RiFileListLine /><span className="ps-1">History</span>
			                	</Nav.Link>
			                	<Nav.Link as={Link} to="/logout" className="navlink">
			                		<FiLogOut /><span className="ps-1">Logout</span>
			                	</Nav.Link> 	
			                </>
		                	:
		                	<>
		                		<Nav.Link  as={Link} to="/" className="navlink">
		                			<FaHome /><span className="ps-1">Home</span>
		                		</Nav.Link>
		                		<Nav.Link as={Link} to="/login" className="navlink">
		                			<FiLogIn /><span className="ps-1">Login</span>
		                		</Nav.Link>
		                		<Nav.Link as={Link} to="/register" className="navlink">
		                			<GiArchiveRegister /><span className="ps-1">Register</span>
		                		</Nav.Link>

		                	</>
		                }
		               
		              </Nav>
		            </Navbar.Collapse>
		      </Container>
		   </Navbar>
		</>
	)
}