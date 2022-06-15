import { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import AddOrder from '../components/AddOrder';
import Footer from '../components/Footer';


export default function Product() {

	const [ product, setProduct ] = useState([]);
	const { name, description, price } = product;

	let productId = sessionStorage.getItem('productId');
	let base64String = sessionStorage.getItem("base64String");
	
	
	useEffect(() => {
		fetch(`https://happitum-trial.herokuapp.com/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			setProduct(data)
		})		
	}, [])

	
	return (
		<>
			<Row className="d-flex justify-content-center mt-5 pt-4">
			
			    <Card style={{ width: '60rem', border:'none' }}>
			     	<Row>
				     	<Col className="my-auto">
				       		<Card.Img src={`data:image/png;base64,${base64String}`} className="p-0 m-0 w-100 shadow" />
				       	</Col>
				      	<Col>
					       	<Card.Body>
					        	<Card.Title className="fs-3"> { name } </Card.Title>
					         	<Card.Text className="fs-4"> {"\u20B1"} { price } </Card.Text>
					         	<Card.Text> { description } </Card.Text>
					       	</Card.Body>
				       		<div className="pb-2"><AddOrder /></div>
				       	</Col>
			       	</Row>
			    </Card>
		    </Row>
	    	<div style={{paddingTop: "120px"}}><Footer /></div>
	    </>
	);
}


