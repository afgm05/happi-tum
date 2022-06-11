import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

import OrderCard from '../components/OrderCard';



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

	
									
	return (
		<>
				
			{ordersDisplay}
		
		</>	
			
	)
}