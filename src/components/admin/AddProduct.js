import React from 'react';
import { useState } from 'react';
import { Button, Modal, Form, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AddProduct(){
	
	const [ showAdd, setShowAdd ] = useState(false);
	const [ name, setName ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ price, setPrice ] = useState('');
	const [ image, setImage ] = useState();

	const storeId = sessionStorage.getItem('storeIdNeeded');
	
	const openAdd = () => {
		setShowAdd(true)
	}

	const closeAdd = () => {
		setShowAdd(false);
	}

	const fileOnChange = (event) => {
		setImage(event.target.files[0]);
	}

	const addProduct = (event) => {
		event.preventDefault();
		let formData = new FormData();
		
		formData.append("name", name);
		formData.append("description", description);
		formData.append("price", price);
		formData.append("productImage", image);
		formData.append("storeId", storeId);


		fetch(`https://happi-tum.herokuapp.com/products/create`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
			},
			body: formData,
		})
		.then(res => {
			closeAdd();

			if(res) {
				Swal.fire({
					title: 'Success',
					text: 'Item Successfully added',
					icon: 'success',
					confirmButtonColor: '#3085d6',
			  		confirmButtonText: 'Ok'
				}).then(result => window.location.reload())
			} else {
				Swal.fire({
					title: 'error',
					icon: 'error',
					text: 'Something went wrong. Please try again',
					confirmButtonColor: '#3085d6'
				}).then(result => window.location.reload())
			}
		})			
	}
	
	return (
		<>
			<Col className="d-flex justify-content-center" >
				<Button variant="primary" className="addbtn mt-2 mb-3" size="sm" onClick={() => openAdd()}>Add to Menu</Button>
			</Col>
		{/*Edit Modal*/}

			<Modal show={showAdd} onHide={closeAdd}>
				<Form onSubmit={e => addProduct(e)}>
					<Modal.Header closeButton>
						<Modal.Title>Add Product</Modal.Title>
					</Modal.Header>

					<Modal.Body>

						<Form.Group className="my-2">
							<Form.Label>Name</Form.Label>
							<Form.Control 
							      	type="text"
							      	required							   
							     	onChange={e => setName(e.target.value)}
								/>
						</Form.Group>

						<Form.Group className="my-2">
							<Form.Label>Description</Form.Label>
							<Form.Control 
									type="text"
							      	as="textarea"
							      	rows={3}
							      	required
							      	onChange={e => setDescription(e.target.value)}
							 />
						</Form.Group>

						<Form.Group className="my-2">
							<Form.Label>Price</Form.Label>
							<Form.Control 
							      	type="number"
							      	required
							      	onChange={e => setPrice(e.target.value)}
							 />
						</Form.Group>

						<Form.Group controlId="formFileSm" className="my-2">
						    <Form.Label>Product Image</Form.Label>
						    <Form.Control
						    		type="file" size="sm"
						    		required 
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