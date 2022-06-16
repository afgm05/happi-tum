import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function DeleteOrder(prop) {
	
	let productId = prop.prodId;
	
	const deleteProduct = () => {
		Swal.fire({
		  title: 'Are you sure?',
		  text: "You won't be able to revert this!",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		})
		.then((result) => {		  	
		  	if (result.isConfirmed) {

		  		fetch('http://localhost:4000/products/delete', {
		  			method: 'DELETE',
		  			headers: {
		  				'Content-Type': 'application/json',
		  				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
		  			},
		  			body: JSON.stringify({
		  				productId: productId
		  			})
		  		})			  	
		  		.then(
		  			Swal.fire({
		  				title: 'Item Successfully Deleted',
		  				text: "Click Ok to Exit",
		  				icon: 'success',
		  				confirmButtonColor: '#3085d6',
		  				confirmButtonText: 'Ok'
		  			})
		  			.then(result => window.location.reload(false))
		  		)	
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
		
						
	return (
		<>
			<div>
				{ 
					<Button type="submit" size="sm" className="btngrp" variant="danger" onClick={deleteProduct}>Remove</Button>
				}
			</div>      
			
		</>
	);
}
