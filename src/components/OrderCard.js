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
		<Card className="ordercard my-3">
			
		 	<Card.Header className="text-center">{storeName}</Card.Header>
		  	<Card.Text className="orderItem">
		  	<Row>
		  	<Col sm={12} md={8}>
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
		  						<Row onMouseOver={neededId} className="align-middle">
		  							<Col className="text-center">
				  						<Card.Img className="ordercardimg" src={`data:image/png;base64,${base64String}`} />	
		  							</Col>
		  							<Col className="align-middle">
		  								<Row className="pb-3">	
			  								<Col>		
					  							<Card.Text className="itemName fs-4">{item.name}</Card.Text>	
					  						</Col>
					  						<Col>
					  							<Card.Text className="text-end"><RemoveOrderItem orderId={_id} productId={item.productId} /></Card.Text>	
					  						</Col>
				  						</Row>				
				  						<Card.Text className="my-0">quantity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 
				  						<span className="orderQtyBtn ms-3"> 
					  						{
					  							item.quantity > 1 ?
						  						<Button variant="secondary" className="minus" size="sm" onClick={minusQty}>-</Button>
											  	:
											  	<Button variant="secondary" className="minus" size="sm" disabled>-</Button>

					  						}
					  						<span className="itemqty">{item.quantity}</span>
					  						<Button size="sm" className="plus" variant="secondary" onClick={plusQty}>+</Button>	
				  						</span>		
					  					</Card.Text>		
				  						<Card.Text className="my-0">price &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp; {"\u20B1"} {item.price}</Card.Text>					
				  						<Card.Text className="my-0">subtotal &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"\u20B1"} {item.subtotal}</Card.Text>
		  							</Col> 
		  						</Row>				
		  					</ListGroupItem>
	  					)
	  				}) 
	  			}
		  	
		  	</Col>
		  	<Col sm={12} md={4}>
			  	<Card.Text className="text-center pt-2 my-0 fs-5">Total Amount</Card.Text>
			  	<Card.Text className="text-center fs-3">{"\u20B1"} {amtDisplay}</Card.Text>
			  	<Card.Text>
			  	
			  		<ButtonGroup className=" d-flex justify-content-center">
			  		<RemoveOrder /><Checkout /> 
			  		</ButtonGroup>			  		
				  		
			  	</Card.Text>
		  	</Col>
		  	</Row>
		  	</Card.Text>
		</Card>	

	)
	
}





	



	

	
