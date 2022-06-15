import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function DeleteStore(prop) {
	
	let storeId = prop.storeId;

	const deleteStore = () => {
		Swal.fire({
		  title: 'Are you sure?',
		  text: "The Store and all the items in its Menu will be deleted. You won't be able to revert this!",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		})
		.then((result) => {
		  	
		  	if (result.isConfirmed) {
			  	fetch('https://happitum.herokuapp.com/stores/delete', {
			  		method: 'DELETE',
			  		headers: {
			  			'Content-Type': 'application/json',
			  			Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			  		},
			  		body: JSON.stringify({
			  			storeId: storeId
			  		})
		  		})
		  		.then(
		  			Swal.fire({
		  				title: 'Store Successfully Deleted',
		  				text: "Click Ok to Exit",
		  				icon: 'success',
		  				confirmButtonColor: '#3085d6',
		  				confirmButtonText: 'Ok'
		  			})
		  			.then(function() {
		  			window.location.reload(false);
		  		})
		  		)
		  		
			}
		})
	}

						
	return(
		<>
			<div>
				{ 
					<Button type="submit" variant="danger" size="sm" className="btngrp" onClick={deleteStore}>Remove</Button>
				}
			</div>      
			
		</>
	);
}
