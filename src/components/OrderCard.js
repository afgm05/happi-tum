import { useState, useEffect } from 'react';
import { Card, Button, ButtonGroup, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import Checkout from './Checkout';
import RemoveOrder from './RemoveOrder';
import RemoveOrderItem from './RemoveOrderItem';




export default function OrderCard({orderProp}) {

	const { _id, userId, storeId, storeName, products, totalAmount } = orderProp;
	const [ count, setCount ] = useState(0);
	const [ amtDisplay, setAmtDisplay ] = useState(totalAmount);
	
	sessionStorage.setItem('orderId', _id);

	function addToTotal(itemPrice) {
		let total = amtDisplay + itemPrice;
		setAmtDisplay(total);
	}

	function minusToTotal(itemPrice) {
		let total = amtDisplay - itemPrice;
		setAmtDisplay(total)
	}

	const decQty = () => {
		setCount(count - 1);
		updateOrder();
	};

	const incQty = () => {
		setCount(count + 1);
		updateOrder();
	};


	const updateOrder = () => {


		let orderProductId = sessionStorage.getItem('orderProductId');
		let orderId = sessionStorage.getItem('orderId');
		let newQty = sessionStorage.getItem('quantity');

		fetch('http://localhost:4000/orders/editOrder', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				orderId: orderId,
				productId: orderProductId,
				quantity: newQty
			})
		})
		.then(res => res.json())
	}



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

		  					
		  				const minusQty = () => {		
			  				item.quantity --;
			  				item.subtotal -= item.price;			  				
		  					sessionStorage.setItem('orderProductId', item.productId);
		  					sessionStorage.setItem('quantity', item.quantity);
		  					sessionStorage.setItem('orderId', _id);
		  					decQty();	
		  					minusToTotal(item.price);					
		  				};

		  				const plusQty = () => {
		  					item.quantity ++;
		  					item.subtotal += item.price;
		  					sessionStorage.setItem('orderProductId', item.productId);
		  					sessionStorage.setItem('quantity', item.quantity);
		  					sessionStorage.setItem('orderId', _id);
		  					incQty();
		  					addToTotal(item.price);		  					
		  				};

		  				const neededId = () => {
		  					sessionStorage.setItem('neededId', item.productId);
		  					sessionStorage.setItem('storeId', storeId);
		  				}
		  				

		  				return (
		  					<ListGroupItem key={item._id} >
		  						<Row>
		  							<Col>
				  						<Card.Img src={`data:image/png;base64,${base64String}`} />	
		  							</Col>
		  							<Col onMouseOver={neededId}>
		  								<RemoveOrderItem orderId={_id} productId={item.productId} />				
				  						<Card.Text>{item.name}</Card.Text>
				  						<Card.Text>Price: {item.price}</Card.Text>	
				  						{
				  							item.quantity > 1 ?
					  						<Button onClick={minusQty}>-</Button>
										  	:
										  	<Button disabled> 
										  		<span> - </span> 
										  	</Button>

				  						}
				  						<Button onClick={plusQty}>+</Button>					
				  						<Card.Text>Quantity: <span>{item.quantity}</span>
					  						
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
		  		totalAmount: Php {amtDisplay}
		  	</Card.Text>
		  	<Card.Text>
		  		<Checkout /> <RemoveOrder />
		  	</Card.Text>
		</Card>	

	)
	
}





	



	

	
