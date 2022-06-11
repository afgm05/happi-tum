import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import Swal from 'sweetalert2';



export default function RemoveOrderItem() {
	

	
	let orderId = sessionStorage.getItem('orderId');
	let productId = sessionStorage.getItem('neededId');
	

	const removeOrderItem = () => {

		fetch('http://localhost:4000/orders/deleteItem', {
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
				console.log(data)
			} else {
				Swal.fire({
					title: 'error',
					icon: 'error',
					text: 'An Error Occurred'					
				})
			} 
				
		})		
				
	}


						
	return(
		<>
			<div>
				{ 
					<Button type="submit" onClick={removeOrderItem}> x </Button>
				}
			</div>      
			
		</>


		);
}
