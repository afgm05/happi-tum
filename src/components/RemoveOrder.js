import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function RemoveOrder() {
	
	let orderId = sessionStorage.getItem('orderId')

	const removeOrder = () => {

		fetch('http://localhost:4000/orders/remove', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				orderId: orderId
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
					<Button type="submit" variant="danger" className="checkoutbtn" onClick={removeOrder}>Remove</Button>
				}
			</div>      
			
		</>
	);
}
