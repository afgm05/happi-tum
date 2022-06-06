import { useState, useEffect} from 'react';
import StoreCard from './StoreCard';
import { Row, Col } from 'react-bootstrap';

export default function ActiveStores() {

	const [ allStores, setAllStores ] = useState([]);
	const [ activeStores, setActiveStores ] = useState([]);
	
	useEffect(() => {
	
		fetch('http://localhost:4000/stores/')
		.then(res => res.json())
		.then(data => {
			setAllStores(data)
		})
		
	}, [])
	
	useEffect(() => {

		const activeStoreArr = allStores.map(store => {
			
			if (store.isActive === true) {

				return (
					
					<Col key={store._id}>				
					<StoreCard storeProp={store}/>
					</Col>
				);

			} else {

				return null;

			}
		})

		setActiveStores(activeStoreArr);

	}, [allStores])
	

	return (
		<>
			<h2>Active stores</h2>		
			<Row>	
			{activeStores}
			</Row>
		</>

	);
}


