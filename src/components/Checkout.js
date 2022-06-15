import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function Checkout() {
	
	let orderId = sessionStorage.getItem('orderId')

	const checkOut = () => {

		fetch('https://happitum-trial.herokuapp.com/history/checkout', {
			method: 'POST',
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
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: `Order Checked-out! Wait for the delivery.`,
					confirmButtonColor: '#3085d6'
				}).then(() => window.location.reload(false))	
			} else {
				Swal.fire({
					title: 'error',
					icon: 'error',
					text: 'An Error Occurred'					
				}).then(() => window.location.reload(false))
			} 
				
		})						
	}

							
	return(
		<>
			<div>
				{ 
					<Button type="submit" className="checkoutbtn" onClick={checkOut}>Checkout</Button>
				}
			</div>      			
		</>
		);
}
