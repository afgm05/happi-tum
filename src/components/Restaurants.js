import { Carousel, Card, Button } from 'react-bootstrap';

import { useState } from 'react';




export default function Restaurants() {

	
	  const [index, setIndex] = useState(0);

	  const handleSelect = (selectedIndex, e) => {
	    setIndex(selectedIndex);
	  }

	return (
	    <Carousel activeIndex={index} onSelect={handleSelect} id="restaurants">
	      <Carousel.Item>
	        <Card style={{ width: '18rem' }}>
	          <Card.Img variant="top" src="https://www.gardeningknowhow.com/wp-content/uploads/2020/12/healthy-food-selection-400x300.jpg" />
	          <Card.Body>
	            <Card.Title> Name </Card.Title>
	            <Card.Text> Description </Card.Text>
	            <Card.Text>Php </Card.Text>
	            <Button variant="primary">View</Button>
	          </Card.Body>
	        </Card>			
	      </Carousel.Item>	      <Carousel.Item>
	        <Card style={{ width: '18rem' }}>
	          <Card.Img variant="top" src="https://www.gardeningknowhow.com/wp-content/uploads/2020/12/healthy-food-selection-400x300.jpg" />
	          <Card.Body>
	            <Card.Title> Name </Card.Title>
	            <Card.Text> Description </Card.Text>
	            <Card.Text>Php </Card.Text>
	            <Button variant="primary">View</Button>
	          </Card.Body>
	        </Card>			
	      </Carousel.Item>	      <Carousel.Item>
	        <Card style={{ width: '18rem' }}>
	          <Card.Img variant="top" src="https://www.gardeningknowhow.com/wp-content/uploads/2020/12/healthy-food-selection-400x300.jpg" />
	          <Card.Body>
	            <Card.Title> Name </Card.Title>
	            <Card.Text> Description </Card.Text>
	            <Card.Text>Php </Card.Text>
	            <Button variant="primary">View</Button>
	          </Card.Body>
	        </Card>			
	      </Carousel.Item>  
	    </Carousel>
  	);
	

}


//src="https://www.gardeningknowhow.com/wp-content/uploads/2020/12/healthy-food-selection-400x300.jpg"