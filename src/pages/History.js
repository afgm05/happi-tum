import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';


export default function History() {

	const [ history, setHistory ] = useState([]);
	const [ display, setDisplay ] = useState();

	useEffect(() => {
		fetch(`http://localhost:4000/history/all`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			setHistory(data)
		})
		
	}, [])

	console.log(history)
	useEffect(() => {
		const historyArr = history.map(order => {

			
			return (
				<tr key={order._id}>
					<td>{order._id}</td>
					<td>{order.storeName}</td>	
					<td>
						{
							order.products.map(item => {
								return (
										<tr key={item._id}>
										<td>{item.name}</td>
										</tr>
								)
							})
						}
					</td>
					<td>
						{
							order.products.map(item => {
								return (
										<tr>
										<td>{item.quantity}</td>
										</tr>
								)
							})
						}
					</td>
					<td>
						{
							order.products.map(item => {
								return (
										<tr key={item._id}>
										<td>{"\u20B1"} {item.subtotal}</td>
										</tr>
								)
							})
						}
					</td>
					<td>{"\u20B1"} {order.totalAmount}</td>					
					<td>{order.purchasedOn}</td>
				</tr>
			)
		})

		setDisplay(historyArr);
	}, [history])	



	return(
		<>
			<div className="text-center my-4">
				<h1>Order History</h1>
			
			</div>
			
			<Table striped bordered hover responsive>
				<thead className="bg-dark text-white">
					<tr>
						<th>Order Id</th>
						<th>Store Name</th>
						<th>Product</th>
						<th>Quantity</th>
						<th>Subtotal</th>
						<th>TotalAmount</th>
						<th>Purchased On</th>
					</tr>
				</thead>

				<tbody>
					{display}
				</tbody>
			</Table>
		</>

		)
}