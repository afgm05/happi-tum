import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ProductCard({productProp}) {

	const { _id, name, description, price, image } = productProp;

	let arrayData = image.data.data	
	let bytes = [].slice.call(new Uint8Array(arrayData));
	let binary = '';
		bytes.forEach((b) => binary += String.fromCharCode(b))
	
	const base64String = btoa(binary)

	return (		

		<Card style={{ width: '18rem' }}>
		  <Card.Img variant="top" src={`data:image/png;base64,${base64String}`} />
		  <Card.Body>
		    <Card.Title> { name } </Card.Title>
		    <Card.Text> { description } </Card.Text>
		    <Card.Text>Php { price } </Card.Text>
		    <Button variant="primary">View</Button>
		  </Card.Body>
		</Card>			

	);
	
}

