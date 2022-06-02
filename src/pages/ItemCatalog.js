import { useState, useEffect} from 'react';
import CustomerView from '../components/CustomerView';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';



export default function ItemCatalog() {

	const [ allItems, setAllItems ] = useState([])

	const fetchItems = () => {
		fetch('http://localhost:4000/products/active')
		.then(res => res.json())
		.then(data => {
			setAllItems(data)
		})
		
	}

	useEffect(() => {
		fetchItems()
	}, [allItems])


	return (
		<>
			<h1>Food and Beverages</h1>
			
			{/*<Row className="justify-content-start"> 

				<CustomerView allItems={allItems} /> 

			</Row>*/}
		
		</>

	);
}

