import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import EditStore from './EditStore';


export default function ViewStores() {

	const [ allStores, setAllStores ] = useState([]);
	const [ display, setDisplay ] = useState([]);

	useEffect(() => {
		fetch('http://localhost:4000/stores/')
		.then(res => res.json())
		.then(data => {
			setAllStores(data)		
		})
		
	}, [])
								


	useEffect(() => {

		const storesArr = allStores.map(store => {


			return(
				<tr key={store._id}>
					<td>{store.storeName}</td>
					<td>{store.category}</td>
					<td>{store.address}</td>
					<td className={store.isActive ? "text-success" : "text-danger"}>
						{store.isActive ? "Active" : "Inactive"}
					</td>
					<td><EditStore storeId={store._id} /></td>
					<td></td>
					<td></td>
				</tr>
				)
		})

		setDisplay(storesArr)

	}, [allStores])


	return(
		<>
			<div className="text-center my-4">
				<h1>Admin Dashboard</h1>
				
			</div>
			
			<Table striped bordered hover responsive>
				<thead className="bg-dark text-white">
					<tr>
						<th>STORE</th>
						<th>CATEGORY</th>
						<th>ADDRESS</th>
						<th>STATUS</th>
						<th Colspan="3">ACTIONS</th>
					</tr>
				</thead>

				<tbody>
					{display}
				</tbody>
			</Table>

		</>

		)
}