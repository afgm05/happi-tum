import { useState, useEffect } from 'react';
import ItemCard from './ItemCard';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';


export default function CustomerView({allItems}) {

	const [ activeItems, setActiveItems ] = useState([])

	useEffect(() => {

		const activeItemsArray = allItems.map(item => {
			
			if (item.isActive === true) {

				return (
					<Col md="auto" className="justify-content-center">
					<ItemCard key={item._id} itemProp={item}/>
					</Col>
				);

			} else {

				return null;

			}
		})

		setActiveItems(activeItemsArray)

	}, [allItems])

	return (
		<>
			{activeItems}
		</>
	);
}