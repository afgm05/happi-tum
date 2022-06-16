import React from 'react';
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

export default function EditProduct({ prodId }){

	
	const [ showEdit, setShowEdit ] = useState(false);
	const [name, setName] = useState('');
	const [desc, setDesc] = useState('');
	const [price, setPrice] = useState('');
	const [newImage, setNewImage] = useState(false);
	const [image, setImage] = useState();
	
	
	const openEdit = (prodId) => {
		fetch(`http://localhost:4000/products/${prodId}`)
		.then(res => res.json())
		.then(data => {
			setName(data.name);
			setDesc(data.description);
			setPrice(data.price);
		})

		setShowEdit(true)
	}

	const closeEdit = () => {
		setShowEdit(false);
	
	}

	const fileOnChange = (event) => {
		setNewImage(true);
		setImage(event.target.files[0]);
	}
	
console.log(newImage)
	const sendForm = (event) => {

		event.preventDefault();	

		if (newImage === true) {
			let formData = new FormData();
			
			formData.append("name", name);
			formData.append("description", desc);
			formData.append("price", price);
			formData.append("productImage", image);

			fetch(`http://localhost:4000/products/${prodId}/withImage`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
				},
				body: formData,
			})
			.then(res => {

				closeEdit();

				if (res) {
					Swal.fire({
						title: 'Success',
						text: 'Item Successfully updated',
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
					
		} else {

			fetch(`http://localhost:4000/products/${prodId}`, {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
				},
				body: JSON.stringify({
					name: name,
					description: desc,
					price: price
				})
			})
			.then(res => {
				closeEdit();
				if(res) {
					Swal.fire({
						title: 'Success',
						text: 'Item Successfully updated',
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
	}	

	return (
		<>
			<Button className="btns3" variant="info" size="sm" onClick={() => openEdit(prodId)}>Update</Button>

			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => sendForm(e)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Product</Modal.Title>
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
							<Form.Label>Description</Form.Label>
							<Form.Control 
							      	type="text"
							      	as="textarea"
							      	rows={3}
							      	required
							      	value={desc}
							      	onChange={e => setDesc(e.target.value)}
							 />
						</Form.Group>

						<Form.Group className="my-2">
							<Form.Label>Price</Form.Label>
							<Form.Control 
							      	type="number"
							      	required
							      	value={price}
							      	onChange={e => setPrice(e.target.value)}
							 />
						</Form.Group>

						<Form.Group controlId="formFileSm" className="my-2">
						    <Form.Label>Product Image (Optional)</Form.Label>
						    <Form.Control
						    		type="file" size="sm" 
						    		onChange={fileOnChange}
						    />
						</Form.Group>

					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="info" type="submit">Submit</Button>
					</Modal.Footer>

				</Form>
			</Modal>

		</>
	)
}