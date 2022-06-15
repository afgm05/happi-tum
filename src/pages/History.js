import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';


export default function History() {

	const [ history, setHistory ] = useState([]);
	const [ display, setDisplay ] = useState();


	useEffect(() => {
		fetch(`https://happitum-trial.herokuapp.com/history/all`, {
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


	useEffect(() => {
		const historyArr = history.map(order => {
	
			return (
				<tr key={order._id} className="text-start align-middle">
					<td ps-3>{order._id}</td>
					<td className="ps-3">{order.storeName}</td>	
					<td>
						{
							order.products.map(item => {
								return (
										
										<tr className="d-flex justify-content-start ps-3">{item.name}</tr>
										
								)
							})
						}
					</td>
					<td>
						{
							order.products.map(item => {
								return (
										
										<tr className="d-flex justify-content-center ps-3">{item.quantity}</tr>
										
								)
							})
						}
					</td>
					<td>	
						{
							order.products.map(item => {
								return (
									
										<tr className="d-flex justify-content-center ps-3">{"\u20B1"} {item.subtotal}</tr>
								)
							})
						}
					</td>
					<td className="text-center">{"\u20B1"} {order.totalAmount}</td>					
					<td>{order.purchasedOn}</td>
				</tr>
			)
		})

		setDisplay(historyArr);
	}, [history])	


	return (
		<> 
		{	
			history.length ?
			<div className="text-center my-4">
				<h1 className="font-link pb-3">Order History</h1>
				<Table striped bordered hover responsive className="font-link storetable">
					<thead className="bg-dark text-white">
						<tr className="text-center">
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
			</div>
			:
			<div>
				<p className="my-5 py-5 text-center fs-4">You have not made any purchase yet.</p>
			</div>
		}
		</>
	);
}