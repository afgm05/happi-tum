import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Row, Col } from 'react-bootstrap';


export default function ProductCatalogByStore() {

	const [ storeProducts, setStoreProducts ] = useState([]);
	const [ ActiveProducts, setActiveProducts ] = useState([]);

	let storeId = sessionStorage.getItem("storeId");
	
	useEffect(() => {
		fetch(`http://localhost:4000/stores/${storeId}/products`)
		.then(res => res.json())
		.then(data => {
			setStoreProducts(data)
		})
		
	}, [])

	useEffect(() => {
		const storeProductsArr = storeProducts.map(product => {
			if (product.isActive === true) {
				return (					
					<Col key={product._id}>				
					<ProductCard productProp={product}/>
					</Col>
				);
			} else {
				return null;
			}
		})
		setActiveProducts(storeProductsArr);
	}, [storeProducts])	

	return (
		<>
			<h1>Food and Beverages</h1>			
			{ActiveProducts}			
		</>
	);
}


