import { useState } from 'react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function AddOrder() {

	let productId = sessionStorage.getItem('productId');
	const [ count, setCount ] = useState(0);

	const addOrder = () => {

		fetch('http://localhost:4000/orders/AddOrder', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				productId: productId,
				quantity: count
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if (data) {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Order added to Cart'
				})

			} else {
				Swal.fire({
					title: 'error',
					icon: 'error',
					text: 'Please try again'
				})
			}
		})



	}
			

	return(
		<>

			
				<ButtonGroup>
				  <Button className="btn btn-primary" onClick={() => { 
				  		if (count === 0) {
				  			setCount(0);
				  		} else if (count > 0) {
				  			setCount(count - 1)}
				  		}}> 
				  	<span> - </span> 
				  </Button>
				  <div>
				   <span className="count">{count}</span>
				  </div>
				  <Button className="btn btn-primary" onClick={() => setCount(count + 1)}><span> + </span> </Button>
				</ButtonGroup>
				<div>
					{ 
						count > 0 ?
						<Button type="submit" className="btn btn-primary" onClick={e => addOrder()}>Add to Cart</Button>
						:
						<Button type="submit" className="btn btn-primary" onClick={e => addOrder()} disabled>Add to Cart</Button>
					}
				</div>      
			
		</>


		)
}