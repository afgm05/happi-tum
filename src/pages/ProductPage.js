import { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import AddOrderButtons from '../components/AddOrderButtons';
import AddOrder from '../components/AddOrderButtons';




export default function Product() {

	const [ product, setProduct ] = useState([]);
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

	    <Card style={{ width: '18rem' }}>
	     	<Row>
	     	<Col>
	       	<Card.Img variant="top" src={`data:image/png;base64,${base64String}`} />
	       	</Col>
	       	<Col>
	       	<Card.Body>
	        	<Card.Title> { name } </Card.Title>
	         	<Card.Text> { price } </Card.Text>
	         	<Card.Text> { description } </Card.Text>
	       	</Card.Body>
	       	<AddOrder />
	       	</Col>
	       	</Row>
	    </Card>

	);
}


