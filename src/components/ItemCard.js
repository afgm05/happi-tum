import { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ItemCard({itemProp}) {

	const { _id, name, description, price } = itemProp;

	return (		
					<Card style={{ width: '18rem' }}>
					  <Card.Img variant="top" src="https://via.placeholder.com/150" />
					  <Card.Body>
					    <Card.Title> { name } </Card.Title>
					    <Card.Text> { description } </Card.Text>
					    <Card.Text>Php { price } </Card.Text>
					    <Button variant="primary">View</Button>
					  </Card.Body>
					</Card>				
	);
	
}


ItemCard.propTypes = {
	
	itemProp: PropTypes.shape({
		
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired

	})

}
















