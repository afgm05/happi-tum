import { useState } from 'react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


export default function AddOrder() {

	let productId = sessionStorage.getItem('productId');
	const [ count, setCount ] = useState(0);
	const navigate = useNavigate();
	let isAdmin = localStorage.getItem("isAdmin");
	let storeId = sessionStorage.getItem('storeId')
	
	const addOrder = () => {

		if (isAdmin === "true" ) {
			Swal.fire({
				title: 'error',
				icon: 'error',
				text: 'Your account is an Admin'
			})

		} else {
			fetch('http://localhost:4000/orders/AddOrder', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
				},
				body: JSON.stringify({
					storeId: storeId,
					productId: productId,
					quantity: count
				})
			})
			.then(res => res.json())
			.then(data => {
				if (data.auth === 'Failed' && data.message === 'jwt malformed') {
					navigate('/login');		
				} else {
					if (data) {
						Swal.fire({
							title: 'Success',
							icon: 'success',
							text: 'Order added to Cart'
						}).then(result => {

							if(result.isConfirmed) {

								navigate(-1)
							}
						})
						
					} else {
						Swal.fire({
							title: 'error',
							icon: 'error',
							text: 'An Error Occurred'					
						})
					}
				}
			})			
		}
	}
			

	return(
		<>
			<ButtonGroup>
				{
					count > 0 ?
				  	<Button className="btn btn-primary" onClick={() => { 
				  		if (count === 0) {
				  			setCount(0);
				  		} else if (count > 0) {
				  			setCount(count - 1)}
				  		}}> 
				  		<span> - </span> 
				  	</Button>
				  	:
				  	<Button className="btn btn-primary" onClick={() => { 
				  		if (count === 0) {
				  			setCount(0);
				  		} else if (count > 0) {
				  			setCount(count - 1)}
				  		}} disabled> 
				  		<span> - </span> 
				  	</Button>

				}
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


