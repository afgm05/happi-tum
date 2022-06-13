import { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
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
		<Card className="catalogItem h-100 shadow ms-auto me-auto" style={{ width: '16rem', cursor: 'pointer' }} onClick={() => handleClick()}>
		 	<Card.Img className="prodCatalogImg" variant="top" src={`data:image/png;base64,${base64String}`} />
		  	<Card.Body className="p-2">
		  		<Row>
				  	<Col xs={6}>
					    <Card.Text className="py-0 my-0"> { name } </Card.Text>
					    <Card.Text>{"\u20B1"} { price } </Card.Text>  		
				  	</Col>
				  	<Col xs={6} className="text-end my-auto"><Button size="sm" ><span className="catalogplus">+</span></Button></Col>
			  	</Row>
		  	</Card.Body>
		</Card>
	);
	
}

