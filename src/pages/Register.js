import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';


export default function Register() {

	const { user } = useContext(UserContext);

	//state hooks to store the values of the input fields
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ verifyPassword, setVerifyPassword ] = useState('');

	//state for the enable/disable button
	const [ isActive, setIsActive ] = useState();
	const [ successReg, setSuccessReg ] = useState();

	useEffect(() => {
		//Validation to enable submit button
		if (firstName !== '' && lastName !== '' && email !== '' && password !== '' && verifyPassword !== '') {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [firstName, lastName, email, password, verifyPassword])
	


	function registerUser(e) {
		e.preventDefault();

		fetch('https://happitum-trial.herokuapp.com/users/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
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

				setSuccessReg(false);

			} else {

				Swal.fire({
					title: 'Yaaaaaaaaaaaay!',
					icon: 'success',
					text: 'You have successfully registered!'
				})

				setSuccessReg(true);
			}


		})


		//Clear input fields
		setEmail('');
		setPassword('');
		setVerifyPassword('');


		
	}


	return(

		(successReg === true) ? 

		<Navigate to="/login" />

		:

		<Form onSubmit={e => registerUser(e)}>
		    <h1>Register</h1>

		    <Form.Group>
		    	<Form.Label>First Name</Form.Label>
		    	<Form.Control 
		    	    type="text"
		    	    placeholder="Enter first name"
		    	    required
		    	    value={firstName}
		    	    onChange={e => {
			    	    let capFirstName = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase();
		    	    	setFirstName(capFirstName)
		    	    }}
		    	  />
		    </Form.Group>

		    <Form.Group>
		    	<Form.Label>Last Name</Form.Label>
		    	<Form.Control 
		    	    type="text"
		    	    placeholder="Enter last name"
		    	    required
		    	    value={lastName}
	        	    onChange={e => {
	    	    	    let capLasttName = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase();
	        	    	setLastName(capLasttName)
	        	    }}
		    	  />
		    </Form.Group>

			<Form.Group>
				<Form.Label>Email Address</Form.Label>
				<Form.Control 
				    type="email"
				    placeholder="Enter email"
				    required
				    value={email}
				    onChange={e => setEmail(e.target.value)}
				    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
				    onInvalid={e => e.target.setCustomValidity('Please provide  a correct email format')}
				    onInput={e => e.target.setCustomValidity('')}

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
				    pattern=".{4,}"
				    onInvalid={e => e.target.setCustomValidity('Should be four or more characters')}
				    onInput={e => e.target.setCustomValidity('')}
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
				    pattern={password}
				    onInvalid={e => e.target.setCustomValidity('Passwords do not match')}
				    onInput={e => e.target.setCustomValidity('')}
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