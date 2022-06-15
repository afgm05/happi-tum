import { useState, useEffect, useContext } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
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
		sessionStorage.setItem('storeId', _id);
		sessionStorage.setItem('restoName', storeName);
		navigate('/catalog');
	}

	
	return (

		<Row className="d-flex">
			<Col className="justify-content-center mb-4">		
				<Card style={{ width: '15rem', cursor: 'pointer'}} onClick={() => handleClick()} className="text-center border-dark -border h-100 border-0 shadow mx-auto">
				  <Card.Img style={{height: '8rem'}} variant="top" src={`data:image/png;base64,${base64String}`} />
				  <Card.Body className="p-0">
				    <Card.Title className="my-0"> { storeName } </Card.Title>
				    <Card.Text className="py-0 my-0" style={{fontSize: "14px"}}> { category } </Card.Text>
				    <Card.Text style={{fontSize: "14px"}} className="pt-0 pb-1"> {address} </Card.Text>
				  </Card.Body>
				</Card>	
			</Col>
		</Row>
	);	
}