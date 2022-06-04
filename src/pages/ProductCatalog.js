import { useState, useEffect} from 'react';
import CustomerView from '../components/CustomerView';


export default function ProductCatalog() {

	const [ allProducts, setAllProducts ] = useState([])

	
	const fetchData = () => {
		fetch('http://localhost:4000/products/active')
		.then(res => res.json())
		.then(data => {
			setAllProducts(data)
		})
		
	}

	useEffect(() => {

		fetchData()
		
	}, [])
	

	return (
		<>
			<h1>Food and Beverages</h1>
			
			<CustomerView productsData={allProducts} />
			
			

		</>

	);
}

