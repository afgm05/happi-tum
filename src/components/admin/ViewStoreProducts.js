import React from 'react';
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import EditProduct from './EditProduct';
import ProductStatus from './ProductStatus';
import AddProduct from './AddProduct';



export default function ViewStoreProducts() {

	const [ storeProducts, setStoreProducts ] = useState([]);
	const [ display, setDisplay ] = useState([]);

	const storeId = sessionStorage.getItem('storeIdNeeded');

	useEffect(() => {
		fetch(`http://localhost:4000/stores/${storeId}/products`)
		.then(res => res.json())
		.then(data => {
			setStoreProducts(data)
		})		
	}, [])
								
	console.log(storeId)
	useEffect(() => {

		const prodArr = storeProducts.map(item => {

			return(
				<tr key={item._id}>
					<td>{item.name}</td>
					<td>{item.description}</td>
					<td>{"\u20B1"} {item.price}</td>
					<td className={item.isActive ? "text-success" : "text-danger"}>
						{item.isActive ? "Active" : "Inactive"}
					</td>
					<td>
						<EditProduct prodId={item._id} />
						<ProductStatus prodId={item._id} isActive={item.isActive} />
					</td>
				</tr>
				)
		})


		setDisplay(prodArr)

	}, [storeProducts])

	return(
		<>
			<div className="text-center my-4">
				<h1>Admin Dashboard</h1>
				
			</div>
			<div><AddProduct /></div>
			<Table striped bordered hover responsive>
				<thead className="bg-dark text-white">
					<tr>
						<th>ITEM</th>
						<th>DESCRIPTION</th>
						<th>PRICE</th>
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