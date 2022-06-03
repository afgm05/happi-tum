import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useState } from 'react';




export default function Location() {

	const [ location, setLocation ] = useState();
	const [ title, setTitle ] = useState('Select your location');
	const [value,setValue]=useState('');
	const handleSelect=(e)=>{
	  setValue(e);
	  setTitle(e)

	}

	return (	
	
		<>
			<DropdownButton
			alignRight
			title={title}
			id="dropdown-menu-align-right"
			onSelect={handleSelect}
			 >
			        <Dropdown.Item eventKey="Batangas">Batangas</Dropdown.Item>
			        <Dropdown.Item eventKey="Laguna">Laguna</Dropdown.Item>
			        <Dropdown.Item eventKey="Manila">Manila</Dropdown.Item>
			</DropdownButton>		
		</>				
	)
	
}


