import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Row, Col } from 'react-bootstrap';
import FooterPage from './Footer';


export default function ProductCatalogByStore() {

	const [ storeProducts, setStoreProducts ] = useState([]);
	const [ ActiveProducts, setActiveProducts ] = useState([]);

	const storeId = sessionStorage.getItem("storeId");
	const storeName = sessionStorage.getItem("restoName");
	const message = `${storeName}'s Menu`;
	
	useEffect(() => {
		fetch(`http://localhost:4000/stores/${storeId}/products`)
		.then(res => res.json())
		.then(data => {
			setStoreProducts(data)
			
		})
		
	}, [])

	useEffect(() => {

		if (storeProducts.length) {

			const storeProductsArr = storeProducts.map(product => {
				if (product.isActive === true) {
					return (
											
						<Col key={product._id} xs={3} className="py-3">				
							<ProductCard productProp={product}/>
						</Col>
						
					);
				} else {
					return null;
				}
			})
			setActiveProducts(storeProductsArr);

		} else {

			setActiveProducts(`Sorry! There is no item on the menu yet.`)
		}

	}, [storeProducts])	

	return (
		<>	
			<div className="px-5 mb-5 pb-5">
				<h2 className="my-5 justify-content-center d-flex" >{message}</h2>
				<Row className="d-flex justify-content-center">
					{ActiveProducts}	
				</Row>
			</div>
				<FooterPage />
		</>
	);
}


