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
					<StoreCard storeProp={store} class='card'/>
					</Col>
				);
			} else {
				return null;
			}
		})
		setActiveStores(activeStoreArr);
	}, [allStores])
	
	console.log(allStores.length)
	return (
		<>		
			<Row className="pb-5 mt-5">
				<Col xs={8} className="d-flex flex-wrap ms-5">{activeStores}</Col>	
			</Row>
		</>
	);
}


