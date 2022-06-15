import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import StoreCard from './StoreCard';
import Banner from './Banner';
import { Row, Col } from 'react-bootstrap';


export default function ActiveStores() {

	const [ allStores, setAllStores ] = useState([]);
	const [ activeStores, setActiveStores ] = useState([]);
	const { user } = useContext(UserContext);
	
	useEffect(() => {
		fetch('https://happitum.herokuapp.com/stores/')
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

	
	return (
		<>	
		{
			(user.accessToken !== null) ?
			<>
				<Row className="pb-5 d-flex mt-5">
					<h5 style={{fontFamily: 'Courgette', color: 'orange', fontSize: "25px", paddingBottom: "5px", paddingLeft: "250px"}}>
					Choose from variety of Restaurants</h5>
					<Col xs={7} className="d-flex flex-wrap ms-5">{activeStores}</Col>	
					<Col xs={4} className="mt-5"><Banner /></Col>
				</Row>
			</>
			:
			<Row className="pb-5 mt-4 d-flex">
				<h5 style={{fontFamily: 'Courgette', color: 'orange', fontSize: "25px", paddingBottom: "5px", paddingLeft: "250px"}}>
				Choose from variety of Restaurants</h5>
				<Col xs={7} className="d-flex flex-wrap ms-5">{activeStores}</Col>	
				<Col xs={4} className="mt-4"><Banner /></Col>
			</Row>
		}	
		</>
	);
}


