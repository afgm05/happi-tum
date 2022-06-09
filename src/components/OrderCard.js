import { useState, useEffect } from 'react';
import { Card, Button, ButtonGroup, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';



export default function OrderCard({orderProp}) {

	const { userId, storeId, storeName, products, totalAmount } = orderProp;
	


	return (
		<Card style={{ width: '30rem' }}>
		 	<Card.Header>{storeName}</Card.Header>
		  	<Card.Text>
		  		{
		  			products.map(item => {

		  				let arrayData = item.image.data.data;
		  				let bytes = [].slice.call(new Uint8Array(arrayData));
		  				let binary = '';
		  				bytes.forEach((b) => binary += String.fromCharCode(b));
		  				const base64String = btoa(binary);

		  			

		  				return (
		  					<ListGroupItem>
		  						<Row>
		  							<Col>
				  						<Card.Img src={`data:image/png;base64,${base64String}`} />	
		  							</Col>
		  							<Col>
				  						<Card.Text>{item.name}</Card.Text>					
				  						<Card.Text>Price: {item.price}</Card.Text>							
				  						<Card.Text>Quantity: 
					  						
				  						</Card.Text>							
				  						<Card.Text>Subtotal: {item.subtotal}</Card.Text>							
		  							</Col>
		  							
		  						</Row>
		  					</ListGroupItem>
		  				)
		  			})
		  		}
		  	</Card.Text>
		  	<Card.Text>
		  		totalAmount: Php {totalAmount}
		  	</Card.Text>
		</Card>	

	)
	
}





	



	

	
