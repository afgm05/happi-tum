import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import Swal from 'sweetalert2';
import React, { Component } from 'react';
import { GoX } from "react-icons/go";


export default function RemoveOrderItem(props) {
	
	const { orderId, productId } = props;	

	const removeOrderItem = () => {

		fetch('https://happitum.herokuapp.com/orders/deleteItem', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				orderId: orderId,
				productId: productId
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data) {
				window.location.reload(false)
			} else {
				Swal.fire({
					title: 'error',
					icon: 'error',
					text: 'An Error Occurred'					
				})
			} 
				
		})						
	}

						
	return (
		<>
			<div>
				{ 
					<Button className="x-order" size="sm" type="submit" variant="ligth" onClick={removeOrderItem}><span className="x fs-5"><GoX /> </span></Button>
				}
			</div>      
			
		</>
	);
}
