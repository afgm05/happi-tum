import React from 'react';
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AddStore({ storeId, fetchData }){

	
	const [ showEdit, setShowEdit ] = useState(false);
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [address, setAddress] = useState('');
	const[image, setImage] = useState({});
	
	
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
		setName('');
		setCategory('');
		setAddress('');
	}


	const fileOnChange = (event) => {
		setImage(event.target.files[0]);
	}

	const sendImage = (event) => {
		let formData = new FormData();
		
		formData.append("storeName", name);
		formData.append("category", category);
		formData.append("address", address);
		formData.append("storeImage", image);

		fetch(`http://localhost:4000/stores/${storeId}`, {
			method: "PUT",
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
					text: 'Store successfully updated'
				})
				fetchData();
				closeEdit();
			} else if (resBody === "false"){
				Swal.fire({
					title: 'error',
					icon: 'error',
					text: `Encountered an Error.`
				})

				fetchData();
				closeEdit();
			}
		});
		
	}	


	
	return(
		<>
			<Button variant="primary" size="sm" onClick={() => openEdit(storeId)}>Update</Button>

		{/*Edit Modal*/}

			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => sendImage(e, storeId)}>
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
						<Button variant="secondary" onClick={sendImage}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>

				</Form>
			</Modal>

		</>


		)
}