import { useState, useEffect, useContext } from 'react';
import { Form, Button, Col, Row} from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Login() {

//const navigate = useNavigate();
const { user, setUser } = useContext(UserContext);
const [ email, setEmail ] = useState('');
const [ password, setPassword ] = useState('');
const [ isActive, setIsActive ] = useState(true); //Button


useEffect(() => {

	if(email !== '' && password !== '') {
		setIsActive(true);
	} else {
		setIsActive(false);
	}

}, [email, password])


function authentication(e) {
	e.preventDefault();

	fetch('https://happitum.herokuapp.com/users/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email: email,
			password: password
		})
	})
	.then(response => response.json())
	.then(data => {

		if (data.accessToken !== undefined) {
			localStorage.setItem('accessToken', data.accessToken);
			setUser({
				accessToken: data.accessToken,

			})

			//get user's details from our token
			fetch('https://happitum.herokuapp.com/users/details', {
				headers: {
					Authorization: `Bearer ${data.accessToken}`
				}			
			})
			.then(res => res.json())
			.then(data => {
				localStorage.setItem('firstName', data.firstName);			
				localStorage.setItem('isAdmin', data.isAdmin);
				setUser({isAdmin: data.isAdmin});
			})				   
		} else {
			Swal.fire({
				title: 'Ooopsss',
				icon: 'error',
				text: 'Something went wrong. Check your Credentials'
			})
		}
		setEmail('');
		setPassword('');
	})

}


return(

	(user.accessToken !== null) ?

	<Navigate to="/" />
	:
	<>
		<Row className="d-flex justify-content-center">
			<Col xs={12} md={4}>
				<Form onSubmit={e => authentication(e)} className="form">
			        <h1 className="text-center">Login</h1>
					<Form.Group className="formgroup">
						<Form.Label>Email Address</Form.Label>
						<Form.Control 
						    type="email"
						    placeholder="Enter your email"
						    required
						    value={email}
						    onChange={e => setEmail(e.target.value)}
						    />
					</Form.Group>

					<Form.Group className="formgroup">
						<Form.Label>Password</Form.Label>
						<Form.Control 
						    type="password"
						    placeholder="Enter your password"
						    required
						    value={password}
						    onChange={e => setPassword(e.target.value)}
						    />
					</Form.Group>
					{ isActive ?
						<Button type="submit" className="mt-3 button">
							Submit
						</Button>
						:
						<Button type="submit" className="mt-3 button" disabled>
							Submit
						</Button>
					}
				</Form>
			</Col>
		</Row>
		<Row style={{"paddingTop": "150px"}}><Footer /></Row>
	</>
	)
}