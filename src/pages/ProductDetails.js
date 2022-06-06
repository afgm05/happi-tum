import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import AddOrder from '../components/AddOrder';


export default function ProductDetails() {

	const [ product, setProduct ] = useState([]);
	const [ ActiveProducts, setActiveProducts ] = useState([]);
	const { name, description, price } = product;

	let productId = sessionStorage.getItem('productId');
	let base64String = sessionStorage.getItem("base64String");
	
	
	useEffect(() => {
		fetch(`http://localhost:4000/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			setProduct(data)
		})
		
	}, [])

	
	return (
		<>
			<h1>specific product</h1>
			<Row>
				<Col>
					<img src={`data:image/png;base64,${base64String}`} />
				</Col>
				<Col>
					<h1>{name}</h1>
					<p>{description}</p>
					<p>Php {price}</p>
					<AddOrder />	
				</Col>
			</Row>
			
			

		</>

	);
}


