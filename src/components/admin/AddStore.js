import React from 'react';
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AddStore(){

	
	const [ showAdd, setShowAdd ] = useState(false);
	const [ name, setName ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ address, setAddress ] = useState('');
	const [ image, setImage ] = useState();

	
	const openAdd = () => {
		setShowAdd(true)
	}

	const closeAdd = () => {
		setShowAdd(false);
	}


	const fileOnChange = (event) => {
		setImage(event.target.files[0]);
	}

	const addStore = (event) => {
		let formData = new FormData();
		
		formData.append("storeName", name);
		formData.append("category", category);
		formData.append("address", address);
		formData.append("storeImage", image);
		
		sessionStorage.setItem('wa', formData)
		fetch(`http://localhost:4000/stores/register`, {
			method: "POST",
			headers: {
					Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
			},
			body: formData,
		})
		.then((res) => res.text())
		.then((resBody) => {
			if(resBody === 'true') {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Store Successfully Registered'
				})
			
				
			} else if (resBody === "false"){
				Swal.fire({
					title: 'error',
					icon: 'error',
					text: `Encountered an Error.`
				})

			}
		});
		
	}	


	
	return(
		<>
			<Button variant="primary" size="sm" onClick={() => openAdd()}>Add Store</Button>

		{/*Edit Modal*/}

			<Modal show={showAdd} onHide={closeAdd}>
				<Form onSubmit={addStore}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Store</Modal.Title>
					</Modal.Header>

					<Modal.Body>

						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control 
							      	type="text"
							      	required
							      	value={name}
							     	onChange={e => setName(e.target.value)}
								/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Category</Form.Label>
							<Form.Control 
							      	type="text"
							      	required
							      	value={category}
							      	onChange={e => setCategory(e.target.value)}
							 />
						</Form.Group>

						<Form.Group>
							<Form.Label>Address</Form.Label>
							<Form.Control 
							      	type="text"
							      	required
							      	value={address}
							      	onChange={e => setAddress(e.target.value)}
							 />
						</Form.Group>

						<Form.Group controlId="formFileSm" className="mb-3">
						    <Form.Label>Store Image</Form.Label>
						    <Form.Control
						    		type="file" size="sm" 
						    		onChange={fileOnChange}
						    />
						 </Form.Group>


					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={closeAdd}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>

				</Form>
			</Modal>

		</>


		)
}