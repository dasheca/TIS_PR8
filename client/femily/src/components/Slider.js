import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image1 from '../components/assets/slide1.png';
import Image2 from '../components/assets/slide2.png';
import Image3 from '../components/assets/slide3.png';

function AdaptiveSlider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
      <img
            className="d-block w-100"
            src={Image1}
            alt="Third slide"
            style={{ maxHeight: '10vw' }} 
          />
        <Carousel.Caption style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <h3 style={{ fontFamily: 'Cormorant' }}>First slide label</h3>
            <p style={{ fontFamily: 'Cormorant' }}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
            className="d-block w-100"
            src={Image2}
            alt="Third slide"
            style={{ maxHeight: '10vw' }} 
          />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
            className="d-block w-100"
            src={Image3}
            alt="Third slide"
            style={{ maxHeight: '10vw' }} 
          />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default AdaptiveSlider;
