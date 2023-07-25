import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Carousel from 'react-bootstrap/Carousel';
import food from "../assest/food.webp"; 
import imagec from "../assest/imagec.avif"
import imagec2 from "../assest/imagec2.avif"
import imagec4 from "../assest/image1.avif"
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

function Carousels() {
  return (
    <Carousel className="h-[80vh] w-[90%] m-0 p-0">
      <Carousel.Item interval={900}>
        <img src={imagec4} className="h-[80vh] w-[100%] text-black"></img>
        <Carousel.Caption>
          <em className="text-2xl">Life Is Uncertain</em><br></br>
          <em className="text-xl">Eat Desert First</em>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={900} className="flex justify-center">
        <img src={imagec} className="h-[80vh] w-[100%]"></img>
        <Carousel.Caption>
          <em className="text-xl ">Just Order Us</em>
          <h3><em className="text-2xl">Start The Day </em></h3>
          <em className="text-xl">in the best way</em>
        </Carousel.Caption>
        
      </Carousel.Item>
      <Carousel.Item interval={900}>
        <img src={imagec2} className="h-[80vh] w-[100%]"></img>
        <Carousel.Caption>
        <em className="text-2xl">Life Is Uncertain</em><br></br>
          <em className="text-xl">Eat Desert First</em>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;