import React from 'react';
import { useState, useEffect } from 'react';
import { Table, Button, ButtonGroup, Row, Col } from 'react-bootstrap';
import { Navigate, useNavigate} from 'react-router-dom';
import EditStore from './EditStore';
import StoreStatus from './StoreStatus';
import AddStore from './AddStore';
import DeleteStore from './DeleteStore';


export default function ViewStores() {

	const [ allStores, setAllStores ] = useState([]);
	const [ display, setDisplay ] = useState([]);
	const message = `There is no registered store yet. Start adding them by clicking the "Add Store" Button`;
	let navigate = useNavigate();

	useEffect(() => {
		fetch('https://happitum-trial.herokuapp.com/stores/')
		.then(res => res.json())
		.then(data => {
			setAllStores(data)		
		})		
	}, [])
								

	function viewProducts(e, storeId, storeName) {
		e.preventDefault();
		navigate('/store-products');
		sessionStorage.setItem('storeIdNeeded', storeId);
		sessionStorage.setItem('storeName', storeName);
	}

	useEffect(() => {

		if (allStores.length ) {

			const storesArr = allStores.map(store => {
		
				return(
					<tr key={store._id} className="text-center">
						<td className="text-start px-4">{store.storeName}</td>
						<td className="text-start px-4">{store.category}</td>
						<td className="text-start px-4">{store.address}</td>
						<td className={store.isActive ? "text-success" : "text-danger"}>
							{store.isActive ? "Active" : "Inactive"}
						</td>
						<td className="d-inline-flex justify-content-start" className="tablecolumn">
							<ButtonGroup>
								<EditStore storeId={store._id} />
								<StoreStatus storeId={store._id} isActive={store.isActive} />
								<DeleteStore storeId={store._id} />
								<Button variant="warning" size="sm" className="btngrp" onClick={e => viewProducts(e, store._id, store.storeName)}>View Products</Button>
							</ButtonGroup>
						</td>
					</tr>
					)
			})
			setDisplay(storesArr)			
		} 

	}, [allStores])


	return (
		<>
		{
			allStores.length?
			<div>
				<div className="d-flex justify-content-center my-2">
				<h2>Admin Store Dashboard</h2>
				</div>
				<div><AddStore /></div>
				<Table striped bordered hover responsive className="font-link storetable"> 
					<thead className="bg-dark text-white">
						<tr className="text-center">
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
			</div>
			:
			(allStores.length === 0) ?
			<div>
				<div className="text-center my-2">
					<h2 className="font-link">Admin Store Dashboard</h2>
				</div>
				<div><AddStore /></div>

				<p className="my-5 text-center">{message}</p>
			</div>
			:
			<div>
				<div className="text-center my-2">
					<h2 className="font-link">Admin Store Dashboard</h2>
				</div>	
				<Row className="d-flex justify-content-center">
					<div className="text-center fs-5 pt-4">Loading...</div>	
				</Row>
			</div>
		}		
		</>

	);
}