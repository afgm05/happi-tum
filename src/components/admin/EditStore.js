import React from 'react';
import { useState } from 'react';
import { Button, Modal, Form, Row, Col} from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

export default function EditStore({ storeId }){
	
	const [ showEdit, setShowEdit ] = useState(false);
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [address, setAddress] = useState('');
	const [newImage, setNewImage] = useState(false);
	const [image, setImage] = useState();	
	
	const openEdit = (storeId) => {
		fetch(`https://happitum.herokuapp.com/stores/${storeId}/details`)
		.then(res => res.json())
		.then(data => {
			setName(data.storeName);
			setCategory(data.category);
			setAddress(data.address);
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

	const sendForm = (event) => {

		event.preventDefault();

		if (newImage === true) {

			let formData = new FormData();
					
				formData.append("storeName", name);
				formData.append("category", category);
				formData.append("address", address);
				formData.append("storeImage", image);

				fetch(`https://happitum.herokuapp.com/stores/${storeId}/withImage`, {
					method: "PUT",
					headers: {
							Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
					},
					body: formData,
				})
				.then( res => {
					closeEdit();

					if(res) {
						Swal.fire({
							title: 'Success',
							icon: 'success',
							text: 'Store successfully updated',
							confirmButtonColor: '#3085d6',
					  		confirmButtonText: 'Ok'
						}).then(result => window.location.reload())
					}
				})
										
		} else {

			fetch(`https://happitum.herokuapp.com/stores/${storeId}`, {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
				},
				body: JSON.stringify({
					storeName: name,
					category: category,
					address: address
				})
			})
			.then(res => {
				closeEdit();

				if (res) {
					Swal.fire({
						title: 'Success',
						icon: 'success',
						text: 'Store successfully updated',
						confirmButtonColor: '#3085d6',
				  		confirmButtonText: 'Ok'
					}).then(result => window.location.reload())	
				}
			})	
		}	
	}	


	return (
		<>
			<Button variant="info" className="btngrp" size="sm" onClick={() => openEdit(storeId)}>Update</Button>

		{/*Edit Modal*/}

			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => sendForm(e)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Store</Modal.Title>
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
						    <Form.Label>Restaurant Image (Optional)</Form.Label>
						    <Form.Control
						    		type="file" size="sm" 
						    		onChange={fileOnChange}
						    />
						</Form.Group>

					</Modal.Body>

					<Modal.Footer>
						
							<Button className="modalbutton" variant="secondary" onClick={closeEdit}>Close</Button>
							<Button variant="info" type="submit">Submit</Button>
				
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	)
}