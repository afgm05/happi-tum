import { useState, useEffect, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';



export default function StoreCard({storeProp}) {


	const { _id, storeName, category, address, image } = storeProp;
	const navigate = useNavigate();

	let arrayData = image.data.data;
	let bytes = [].slice.call(new Uint8Array(arrayData));
	let binary = '';
	bytes.forEach((b) => binary += String.fromCharCode(b));
	const base64String = btoa(binary);
	

	
	function handleClick() {
		sessionStorage.setItem('storeId', _id)
		navigate('/catalog');
	}

	
	return (		

		<Card style={{ width: '15rem', cursor: 'pointer'}} onClick={() => handleClick()} Class='h-100 border border-dark justify-content-center'>
		  <Card.Img variant="top" src={`data:image/png;base64,${base64String}`} />
		  <Card.Body>
		    <Card.Title> { storeName } </Card.Title>
		    <Card.Text> { category } </Card.Text>
		    <Card.Text> {address} </Card.Text>
		  </Card.Body>
		</Card>			

	);
	
}