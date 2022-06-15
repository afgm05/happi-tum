import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

import OrderCard from '../components/OrderCard';
import EmptyCart from '../components/EmptyCart';
import Footer from '../components/Footer';



export default function Cart() {

	const [ allOrders, setAllOrders ] = useState([]);
	const [ ordersDisplay, setOrdersDisplay ] = useState();

	useEffect(() => {
		fetch('http://localhost:4000/users/getOrders', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			setAllOrders(data)
		})
		
	}, [])
	

	useEffect(() => {
		const ordersArr = allOrders.map(order => {
			return (					
				<Col key={order._id}>				
				<OrderCard orderProp={order}/>
				</Col>
			);
		})
		setOrdersDisplay(ordersArr);
	}, [allOrders])

	console.log(allOrders)
									
	return (
		<>	
			{
				allOrders.length ?
				<div>
					<h2 className="text-center mb-4 mt-4">Your Orders</h2>
					{ordersDisplay}	
				</div>
				:
				<div>
					<EmptyCart /> 
					<p className="text-center fs-4">You have no active order</p>
				</div>
			}
			<div style={{paddingTop: "140px"}}>
				<Footer />
			</div>
		</>	
			
	)
}