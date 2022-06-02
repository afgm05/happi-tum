import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';

export default function Register() {

	const { user } = useContext(UserContext);

	//state hooks to store the values of the input fields
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ verifyPassword, setVerifyPassword ] = useState('');

	//state for the enable/disable button
	const [ isActive, setIsActive ] = useState(true);

	useEffect(() => {
		//Validation to enable submit button
		if((email !== '' && password !== '' && verifyPassword !== '') && (password === verifyPassword)){
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email, password, verifyPassword])


	function registerUser(e) {
		e.preventDefault();

		fetch('http://localhost:4000/users/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password,
			})
		})
		.then(response => response.json())
		.then(result => {

			if (result === false ) {

				Swal.fire({
					title: 'Ooopps!',
					icon: 'error',
					text: 'Email already exists. Login or register using another email.'
				})

			} else {

				Swal.fire({
					title: 'Yaaaaaaaaaaaay!',
					icon: 'success',
					text: 'You have successfully registered!'
				})


			}


		})


		//Clear input fields
		setEmail('');
		setPassword('');
		setVerifyPassword('');


		
	}


	return(

		(user.accessToken !== null) ? 

		<Navigate to="/items" />

		:

		<Form onSubmit={e => registerUser(e)}>
		    <h1>Register</h1>
			<Form.Group>
				<Form.Label>Email Address</Form.Label>
				<Form.Control 
				    type="email"
				    placeholder="Enter email"
				    required
				    value={email}
				    onChange={e => setEmail(e.target.value)}
				  />
			</Form.Group>

			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control 
				    type="password"
				    placeholder="Enter your Password"
				    required
				    value={password}
				    onChange={e => setPassword(e.target.value)}
				    />
			</Form.Group>

			<Form.Group>
				<Form.Label>Verify Password</Form.Label>
				<Form.Control 
				    type="password"
				    placeholder="Verify Password"
				    required
				    value={verifyPassword}
				    onChange={e => setVerifyPassword(e.target.value)}
				    />
			</Form.Group>
			
			{isActive ?
				<Button variant="primary" type="submit" className="mt-3">Submit</Button>
				:
				<Button variant="primary" type="submit" className="mt-3" disabled>Submit</Button>
			}
			
			
		</Form>



		)
}