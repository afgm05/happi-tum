import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';


export default function CustomerView({productsData}) {

	const [ activeProducts, setActiveProducts ] = useState([])

	useEffect(() => {

		const activeProductsArr = productsData.map(product => {
			
			if (product.isActive === true) {

				return (
					<Col md="auto" className="justify-content-center">
					<ProductCard key={product._id} productProp={product}/>
					</Col>
				);

			} else {

				return null;

			}
		})

		setActiveProducts(activeProductsArr)

	}, [productsData])

	return (
		<>
			{activeProducts}
		</>
	);
}