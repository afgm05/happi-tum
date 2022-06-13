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
	
	const sendForm = (event) => {	

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
		.then((res) => res.text())
		.then((resBody) => {

			if(resBody) {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Store successfully updated'
				})
				
				
			} else {
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
			<Button className="btns3" variant="primary" size="sm" onClick={() => openEdit(prodId)}>Update</Button>

			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => sendForm(e)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Product</Modal.Title>
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
							<Form.Label>Description</Form.Label>
							<Form.Control 
							      	type="text"
							      	required
							      	value={desc}
							      	onChange={e => setDesc(e.target.value)}
							 />
						</Form.Group>

						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control 
							      	type="number"
							      	required
							      	value={price}
							      	onChange={e => setPrice(e.target.value)}
							 />
						</Form.Group>

					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>

				</Form>
			</Modal>

		</>


		)
}