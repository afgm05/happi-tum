import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import Swal from 'sweetalert2';



export default function RemoveOrderItem(props) {
	
	const { orderId, productId } = props;	

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
					<Button className="x-order" size="sm" type="submit" variant="danger" onClick={removeOrderItem}><div className="x"> X </div></Button>
				}
			</div>      
			
		</>


		);
}
