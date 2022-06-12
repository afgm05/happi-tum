import React from 'react';
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
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


		fetch(`http://localhost:4000/products/create`, {
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
				text: 'Item Successfully added',
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

	console.log(storeId)
	
	return(
		<>
			<Button variant="primary" size="sm" onClick={() => openAdd()}>Add to Menu</Button>

		{/*Edit Modal*/}

			<Modal show={showAdd} onHide={closeAdd}>
				<Form onSubmit={e => addProduct(e)}>
					<Modal.Header closeButton>
						<Modal.Title>Add Product</Modal.Title>
					</Modal.Header>

					<Modal.Body>

						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control 
							      	type="text"
							      	required							   
							     	onChange={e => setName(e.target.value)}
								/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control 
							      	type="text"
							      	required
							      	onChange={e => setDescription(e.target.value)}
							 />
						</Form.Group>

						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control 
							      	type="number"
							      	required
							      	onChange={e => setPrice(e.target.value)}
							 />
						</Form.Group>

						<Form.Group controlId="formFileSm" className="mb-3">
						    <Form.Label>Product Image</Form.Label>
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