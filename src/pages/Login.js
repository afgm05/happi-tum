import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';

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

	fetch('http://localhost:4000/users/login', {
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
				accessToken: data.accessToken
			})


			//get user's details from our token
			fetch('http://localhost:4000/users/details', {
				headers: {
					Authorization: `Bearer ${data.accessToken}`
				}			
			})
			.then(res => res.json())
			.then(data => {
				

				if(data.isAdmin === true) {
					localStorage.setItem('isAdmin', data.isAdmin)

					setUser({
						isAdmin: data.isAdmin
					})

				}

			})

		} else {
			Swal.fire({
				title: 'Ooopsss',
				icon: 'error',
				text: 'Something went wrong. Check your Credentials'
			})
		}

		setEmail('')
		setPassword('')
	})

}

return(

	(user.accessToken !== null) ?

	<Navigate to="/" />

	:

	<Form onSubmit={e => authentication(e)}>
        <h1>Login</h1>
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
		{ isActive ?
		<Button variant="primary" type="submit" className="mt-3">
			Submit
		</Button>
		:
		<Button variant="primary" type="submit" className="mt-3" disabled>
			Submit
		</Button>
		}
	</Form>

	)
}