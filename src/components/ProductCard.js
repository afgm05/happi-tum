import { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsCart4 } from "react-icons/bs";


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
		<Card className="catalogItem h-100 shadow ms-auto me-auto" onClick={() => handleClick()} style={{ width: '16rem', cursor: 'pointer'}}>
		 	<Card.Img className="prodCatalogImg" variant="top" src={`data:image/png;base64,${base64String}`} />
		  	<Card.Body className="p-2">
		  		<Row>
				  	<Col xs={9}>
					    <Card.Text className="py-0 my-0 fw-bold"> { name } </Card.Text>
					    <Card.Text>{"\u20B1"} { price } </Card.Text>  		
				  	</Col>
				  	<Col xs={3} className="my-auto"><span className="fs-3 pe-1 d-flex justify-content-end"><BsCart4 /></span></Col>
			  	</Row>
		  	</Card.Body>
		</Card>
	);	
}

