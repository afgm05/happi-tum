import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Row, Col } from 'react-bootstrap';
import FooterPage from '../components/Footer';


export default function ProductCatalogByStore() {

	const [ storeProducts, setStoreProducts ] = useState([]);
	const [ ActiveProducts, setActiveProducts ] = useState([]);
	const [ message, setMessage ] = useState('');

	const storeId = sessionStorage.getItem("storeId");
	const storeName = sessionStorage.getItem("restoName");
	const header = `${storeName}'s Menu`;
	
	useEffect(() => {
		fetch(`https://happi-tum.herokuapp.com/stores/${storeId}/products`)
		.then(res => res.json())
		.then(data => {
			setStoreProducts(data)
			
		})
		
	}, [])

	useEffect(() => {

		if (storeProducts.length) {

			const storeProductsArr = storeProducts.map(product => {
				if (product.isActive === true) {
					return (
											
						<Col key={product._id} xs={3} className="py-3">				
							<ProductCard productProp={product}/>
						</Col>
						
					);
				} else {
					return null;
				}
			})
			setActiveProducts(storeProductsArr);

		} else {

			setMessage(`Sorry! There is no item on the menu yet.`)
		}

	}, [storeProducts])	


	return (
		<>	
			{
				storeProducts.length ?
				<div>
					<div className="px-5 mb-5 pb-5">
						<h2 className="my-4 justify-content-center d-flex">{header}</h2>
						<Row className="d-flex justify-content-center">
							{ActiveProducts}	
						</Row>
					</div>
					<FooterPage />
				</div>
				:
				(storeProducts.length === undefined) ?
				<div>
					<div className="px-5 mb-5 pb-5">
						<h2 className="my-4 justify-content-center d-flex">{header}</h2>
						<Row className="d-flex justify-content-center">
							<div className="text-center fs-5 pt-4">{message}</div>	
						</Row>
					</div>
					<div className="pt-4"><FooterPage /></div>
				</div>
				:
				<div>
					<div className="px-5 mb-5 pb-5">
						<h2 className="my-4 justify-content-center d-flex">{header}</h2>
						<Row className="d-flex justify-content-center">
							<div className="text-center fs-5 pt-4">Loading...</div>	
						</Row>
					</div>
					<div className="pt-4"><FooterPage /></div>
				</div>
			}
		</>
	);
}


