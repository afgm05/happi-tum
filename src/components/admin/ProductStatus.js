import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function ProductStatus(props) {

	let prodId = props.prodId;
	let isActive = props.isActive;

	const deactivateToggle = (prodId) => {
		fetch(`https://happitum.herokuapp.com/products/${prodId}/archive`,{
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data === true) {
				Swal.fire({
					title: 'success',
					icon: 'success',
					text: 'Store successfully disabled'
				})	
			} else {
				Swal.fire({
					title: 'error',
					icon: 'error',
					text: 'Something went wrong'
				})	
			}
		})
		window.location.reload()
	}

	
	const activateToggle = (prodId) => {
		fetch(`https://happitum.herokuapp.com/products/${prodId}/reactivate`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data === true) {
				Swal.fire({
					title: 'success',
					icon: 'success',
					text: 'Course successfully enabled',
					confirmButtonColor: '#3085d6'
				})
			}else {
				Swal.fire({
					title: 'error',
					icon: 'error',
					text: 'Something went wrong',
					confirmButtonColor: '#3085d6'
				})
				
			}
		})
		window.location.reload()
	}

	return (
		<>
			{isActive  ?
				<Button variant="secondary" size="sm" onClick={() => deactivateToggle(prodId)}>Disable</Button>
				:
				<Button variant="success" size="sm" onClick={() => activateToggle(prodId)}>Enable</Button>

			}
			
		</>
	);
}