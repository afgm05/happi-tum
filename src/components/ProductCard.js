import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



export default function ProductCard({productProp}) {

	const { _id, name, description, price, image } = productProp;
	const navigate = useNavigate();

	let arrayData = image.data.data	;
	let bytes = [].slice.call(new Uint8Array(arrayData));
	let binary = '';
	bytes.forEach((b) => binary += String.fromCharCode(b));
	const base64String = btoa(binary);

	function handleClick() {
		sessionStorage.setItem('productId', _id);
		sessionStorage.setItem('base64String', base64String);
		navigate('/product');
	}

	return (		

		<Card style={{ width: '18rem', cursor: 'pointer' }} onClick={() => handleClick()}>
		 	<Card.Img variant="top" src={`data:image/png;base64,${base64String}`} />
		  	<Card.Body>
			    <Card.Title> { name } </Card.Title>
			    <Card.Text> { description } </Card.Text>
			    <Card.Text>Php { price } </Card.Text>
		  	</Card.Body>
		</Card>		

	);
	
}

