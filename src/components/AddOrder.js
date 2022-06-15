import { useState, useContext } from 'react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';


export default function AddOrder() {

	let productId = sessionStorage.getItem('productId');
	const [ count, setCount ] = useState(0);
	const navigate = useNavigate();
	let isAdmin = localStorage.getItem("isAdmin");
	let storeId = sessionStorage.getItem('storeId');
	const { user } = useContext(UserContext);
	
	const addOrder = () => {

		if (isAdmin === "true" ) {
			Swal.fire({
				title: 'error',
				icon: 'error',
				text: 'Your account is an Admin',
				confirmButtonColor: '#3085d6'
			})

		} else {
			fetch('https://happitum-trial.herokuapp.com/orders/AddOrder', {
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
							text: 'Order added to Cart',
							confirmButtonColor: '#3085d6'
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
			

	return (
		<>			
			<ButtonGroup className="d-flex justify-content-center">
				<span className="d-flex mb-2" style={{border: "solid", borderWidth: "thin"}}>
					{
						count > 0 ?
						
					  	<Button className="btngrp" variant="secondary" onClick={() => { 
					  		if (count === 0) {
					  			setCount(0);
					  		} else if (count > 0) {
					  			setCount(count - 1)}
					  		}}> 
					  		<span> - </span> 
					  	</Button>
					  	:
					  	<Button className="btngrp" variant="secondary" disabled> 
					  		<span> - </span> 
					  	</Button>
					}
					
					<div className="count d-flex justify-content-center align-items-center fs-6">{count}</div>			
					<Button className="btngrp" variant="secondary" onClick={() => setCount(count + 1)}>+</Button>
				</span>
			</ButtonGroup>
			{
				(user.accessToken !== null) ?

				<div className="d-flex justify-content-center">
					{ 
						count > 0 ?
						<Button type="submit" className="w-100" onClick={e => addOrder()}>Add to Cart</Button>
						:
						<Button type="submit" className="w-100" disabled>Add to Cart</Button>
					}
				</div>  
				:
				<div className="d-flex justify-content-center">
					<Button type="submit" className="w-100" onClick={e => addOrder()}>Log in to purchase</Button>
				</div>  
			}			   			
		</>
	);
}


