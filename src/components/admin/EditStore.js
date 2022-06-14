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
	
	
	const openEdit = (storeId) => {
		fetch(`http://localhost:4000/stores/${storeId}/details`)
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
	
	const sendForm = (event) => {	

		fetch(`http://localhost:4000/stores/${storeId}`, {
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
			<Button variant="success" className="btngrp" size="sm" onClick={() => openEdit(storeId)}>Update</Button>

		{/*Edit Modal*/}

			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => sendForm(e)}>
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

					</Modal.Body>

					<Modal.Footer>
						
							<Button className="modalbutton" variant="secondary" onClick={closeEdit}>Close</Button>
							<Button variant="success" type="submit">Submit</Button>
				
					</Modal.Footer>

				</Form>
			</Modal>

		</>


		)
}