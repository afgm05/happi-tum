import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function ProductStatus(props) {

	let prodId = props.prodId;
	let isActive = props.isActive;

	const deactivateToggle = (prodId) => {
		fetch(`https://happi-tum.herokuapp.com/products/${prodId}/archive`,{
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then( res => {
			if(res) {
				Swal.fire({
					title: 'success',
					icon: 'success',
					text: 'Store successfully disabled',
					confirmButtonColor: '#3085d6'
				}).then (res => window.location.reload())	
			} else {
				Swal.fire({
					title: 'error',
					icon: 'error',
					text: 'Something went wrong',
					confirmButtonColor: '#3085d6'
				}).then (res => window.location.reload())
			}
		})			
	}

	
	const activateToggle = (prodId) => {
		fetch(`https://happi-tum.herokuapp.com/products/${prodId}/reactivate`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(res => {
			if (res) {
				Swal.fire({
					title: 'success',
					icon: 'success',
					text: 'Course successfully enabled',
					confirmButtonColor: '#3085d6'
				}).then (res => window.location.reload())		
			} else {
				Swal.fire({
					title: 'error',
					icon: 'error',
					text: 'Something went wrong',
					confirmButtonColor: '#3085d6'
				}).then (res => window.location.reload())	
			}
		})
	}

	return (
		<>
			{isActive  ?
				<Button variant="secondary" size="sm" className="btngrp" onClick={() => deactivateToggle(prodId)}>Disable</Button>
				:
				<Button variant="success" size="sm" className="btngrp" onClick={() => activateToggle(prodId)}>Enable</Button>
			}
			
		</>
	);
}