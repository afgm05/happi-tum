import React from 'react';
import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Navigate, useNavigate} from 'react-router-dom';
import EditStore from './EditStore';
import StoreStatus from './StoreStatus';
import AddStore from './AddStore';
import DeleteStore from './DeleteStore';


export default function ViewStores() {

	const [ allStores, setAllStores ] = useState([]);
	const [ display, setDisplay ] = useState([]);
	let navigate = useNavigate();

	useEffect(() => {
		fetch('http://localhost:4000/stores/')
		.then(res => res.json())
		.then(data => {
			setAllStores(data)		
		})
		
	}, [])
								

	function viewProducts(e, storeId) {
		e.preventDefault();
		navigate('/store-products');
		sessionStorage.setItem('storeIdNeeded', storeId);
	}

	useEffect(() => {

		const storesArr = allStores.map(store => {
			const neededId2 = () => {
				sessionStorage.setItem('storeIdNow', store._id);
			}

			return(
				<tr key={store._id}>
					<td>{store.storeName}</td>
					<td>{store.category}</td>
					<td>{store.address}</td>
					<td className={store.isActive ? "text-success" : "text-danger"}>
						{store.isActive ? "Active" : "Inactive"}
					</td>
					<td onMouseOver={neededId2}>
						<EditStore storeId={store._id} />
						<StoreStatus storeId={store._id} isActive={store.isActive} />
						<Button variant="warning" size="sm" onClick={e => viewProducts(e, store._id)}>View Menu</Button>
						<DeleteStore storeId={store._id} />
					</td>
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
			<div><AddStore /></div>
			<Table striped bordered hover responsive>
				<thead className="bg-dark text-white">
					<tr>
						<th>STORE</th>
						<th>CATEGORY</th>
						<th>ADDRESS</th>
						<th>STATUS</th>
						<th>ACTIONS</th>
					</tr>
				</thead>

				<tbody>
					{display}
				</tbody>
			</Table>

		</>

		)
}