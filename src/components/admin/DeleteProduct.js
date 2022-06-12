import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import Swal from 'sweetalert2';



export default function DeleteOrder(prop) {
	
	let productId = prop.prodId;

	

	const deleteProduct = () => {

		fetch('http://localhost:4000/products/delete', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				productId: productId
			})
		}).then(
			Swal.fire({
			    title: "Product Successfully Deleted",
			    text: "Click OK to Exit",
			    type: "success",
			    icon: 'success'
			}).then(function() {
			    window.location.reload(false);
			})
		)
		
				
	}

	

	
	
						
	return(
		<>
			<div>
				{ 
					<Button type="submit" onClick={deleteProduct}>Remove</Button>
				}
			</div>      
			
		</>

		);
}
