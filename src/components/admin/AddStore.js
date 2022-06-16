import React from 'react';
import { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
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
		event.preventDefault();
		let formData = new FormData();
		
		formData.append("storeName", name);
		formData.append("category", category);
		formData.append("address", address);
		formData.append("storeImage", image);
		
		fetch(`http://localhost:4000/stores/register`, {
			method: "POST",
			headers: {
					Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
			},
			body: formData,
		})
		.then(closeAdd())
		.then(	
			Swal.fire({
				title: 'Success',
				text: 'Store Successfully Registered',
				icon: 'success',
				confirmButtonColor: '#3085d6',
		  		confirmButtonText: 'Ok'
			}).then(result => {
				if(result.isConfirmed) {
					window.location.reload()
				}
			})

		)		
	}	


	return(
		<>	
		
			<Col className="d-flex justify-content-center">
				<Button className="addbtn my-3" size="sm" onClick={() => openAdd()}>Add Store</Button>
			</Col>
			
		{/*Edit Modal*/}
			<Modal show={showAdd} onHide={closeAdd}>
				<Form onSubmit={addStore}>
					<Modal.Header closeButton>
						<Modal.Title>Add Store</Modal.Title>
					</Modal.Header>

					<Modal.Body>

						<Form.Group className="my-2">
							<Form.Label>Name</Form.Label>
							<Form.Control 
							      	type="text"
							      	required
							      	value={name}
							     	onChange={e => setName(e.target.value)}
								/>
						</Form.Group>

						<Form.Group className="my-2">
							<Form.Label>Category</Form.Label>
							<Form.Control 
							      	type="text"
							      	required
							      	value={category}
							      	onChange={e => setCategory(e.target.value)}
							 />
						</Form.Group>

						<Form.Group className="my-2">
							<Form.Label>Address</Form.Label>
							<Form.Control 
							      	type="text"
							      	required
							      	value={address}
							      	onChange={e => setAddress(e.target.value)}
							 />
						</Form.Group>

						<Form.Group controlId="formFileSm" className="my-2">
						    <Form.Label>Store Image</Form.Label>
						    <Form.Control
						    		type="file" size="sm" 
						    		onChange={fileOnChange}
						    />
						 </Form.Group>


					</Modal.Body>

					<Modal.Footer>
				
						<Button variant="secondary" onClick={closeAdd}>Close</Button>
						<Button type="submit">Submit</Button>
				
					</Modal.Footer>

				</Form>
			</Modal>

		</>
	);
}