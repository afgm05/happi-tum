import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';



export default function StoreStatus(props) {

	let storeId = props.storeId;
	let isActive = props.isActive;



	const deactivateToggle = (storeId) => {
		fetch(`http://localhost:4000/stores/${storeId}/deactivate`,{
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data =>{
			if(data === true) {
				Swal.fire({
					title: 'success',
					icon: 'success',
					text: 'Store successfully disabled'
				
				})
				window.location.reload()
				
			}else {
				Swal.fire({
					title: 'error',
					icon: 'error',
					text: 'Something went wrong'
				})
				window.location.reload()
			}
		})
	}

	console.log(storeId)
	const activateToggle = (storeId) => {
		fetch(`http://localhost:4000/stores/${storeId}/activate`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data === true) {
				Swal.fire({
					title: 'success',
					icon: 'success',
					text: 'Course successfully enabled'
				})
				window.location.reload()
			}else {
				Swal.fire({
					title: 'error',
					icon: 'error',
					text: 'Something went wrong'
				})
				window.location.reload()
			}
		})
	}

	return(

		<>

			{isActive  ?
				<Button variant="danger" size="sm" onClick={() => deactivateToggle(storeId)}>Disable</Button>
				:
				<Button variant="success" size="sm" onClick={() => activateToggle(storeId)}>Enable</Button>

			}
			
		</>
		)
}