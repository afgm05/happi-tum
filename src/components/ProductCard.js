import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ProductCard({productProp}) {

	const { _id, name, description, price, image } = productProp;

	return (		

		<Card style={{ width: '18rem' }}>
		  <Card.Img variant="top" src={{image}}/>
		  <Card.Body>
		    <Card.Title> { name } </Card.Title>
		    <Card.Text> { description } </Card.Text>
		    <Card.Text>Php { price } </Card.Text>
		    <Button variant="primary">View</Button>
		  </Card.Body>
		</Card>			

	);
	
}


ProductCard.propTypes = {
	
	Prop: PropTypes.shape({
		
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired

	})

}
















