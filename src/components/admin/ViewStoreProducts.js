import React from 'react';
import { useState, useEffect } from 'react';
import { Table, Button, ButtonGroup, Row, Col} from 'react-bootstrap';
import EditProduct from './EditProduct';
import ProductStatus from './ProductStatus';
import AddProduct from './AddProduct';
import DeleteProduct from './DeleteProduct';


export default function ViewStoreProducts() {

	const [ storeProducts, setStoreProducts ] = useState([]);
	const [ display, setDisplay ] = useState([]);
	const message = `There is no product in this store yet. Start adding them by clicking the "Add to Menu" Button`;	
	const storeId = sessionStorage.getItem('storeIdNeeded');
	const storeName = sessionStorage.getItem('storeName');

	useEffect(() => {
		fetch(`https://happitum.herokuapp.com/stores/${storeId}/products`)
		.then(res => res.json())
		.then(data => {
			setStoreProducts(data)
		})		
	}, [])

	useEffect(() => {

		if (storeProducts.length) {
			const prodArr = storeProducts.map(item => {
				return (
					<tr key={item._id} className="text-center">
						<td className="text-start px-4">{item.name}</td>
						<td className="text-start px-4">{item.description}</td>
						<td>{"\u20B1"} {item.price}</td>
						<td className={item.isActive ? "text-success" : "text-danger"}>
							{item.isActive ? "Active" : "Inactive"}
						</td>
						<td className="d-inline-flex justify-content-start" className="tablecolumn">
							<ButtonGroup>
							<EditProduct prodId={item._id} />
							<ProductStatus prodId={item._id} isActive={item.isActive} />
							<DeleteProduct prodId={item._id} />
							</ButtonGroup>
						</td>
					</tr>
				);
			})
			setDisplay(prodArr)
		}
	}, [storeProducts])


	return (
			<>
			{			
				storeProducts.length ?
				<div>
					<div className="text-center my-2">
						<h2 className="font-link">Admin Product Dashboard</h2>	
						<h3>{storeName}</h3>		
					</div>
					<AddProduct />
					<Table striped bordered hover responsive className="font-link storetable">
						<thead className="bg-dark text-white">
							<tr className="text-center">
								<th style={{width: "180px"}}>ITEM</th>
								<th>DESCRIPTION</th>
								<th style={{width: "120px"}}>PRICE</th>
								<th style={{width: "100px"}}>STATUS</th>
								<th>ACTIONS</th>
							</tr>
						</thead>
						<tbody>
							{display}
						</tbody>	
					</Table>
				</div>			
				:
				(storeProducts.length === undefined) ?
				<div>
					<div className="text-center my-2">
						<h2 className="font-link">Admin Product Dashboard</h2>
						<h3>{storeName}</h3>			
					</div>
					<div><AddProduct /></div>
	
					<p className="my-5 text-center">{message}</p>
						
				</div>
				:
				<div>
					<div className="text-center my-2">
						<h2 className="font-link">Admin Product Dashboard</h2>
						<h3>{storeName}</h3>			
					</div>
					<Row className="d-flex justify-content-center">
						<div className="text-center fs-5 pt-4">Loading...</div>	
					</Row>
				</div>
			}
			</>
	);
}