import { useEffect, useState } from "react";
import Proptypes from "prop-types";
import "./Hero.css";
import HeroItem from "./HeroItem";
import Slider from "react-slick";
import { message } from "antd";

// function PrevBtn({ onClick }) {
//   return (
//     <button
//       className="glide__arrow glide__arrow--left"
//       data-glide-dir="<"
//       onClick={onClick}
//       style={{
//         zIndex: "2",
//       }}
//     >
//       <i className="bi bi-chevron-left"></i>
//     </button>
//   );
// }

// PrevBtn.propTypes = {
//   onClick: Proptypes.func,
// };

function NextBtn({ onClick }) {
  return (
    <div className="slider-buttons">
      <button onClick={onClick}>
        <i className="bi bi-chevron-left"></i>
      </button>
    </div>
  );
}
NextBtn.propTypes = {
  onClick: Proptypes.func,
};

function PrevBtn({ onClick }) {
  return (
    <div
      className="slider-buttons"
      style={{ justifyContent: "end", zIndex: "1" }}
    >
      <button onClick={onClick}>
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
}

PrevBtn.propTypes = {
  onClick: Proptypes.func,
};

const Hero = () => {
  // const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([]);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // const nextSlide = () => {
  //   setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
  // };
  // const prevSlide = () => {
  //   setCurrentSlide((prevSlide) => (prevSlide - 1 + 3) % 3);
  // };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/sliders`);

        if (response.ok) {
          const data = await response.json();
          setImages(data);
        } else {
          message.error("Hero failed");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [apiUrl]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    autoplaySpeed: 5000,
    autoplay: true,
    appendDots: (dots) => (
      <div className="slider">
          <div className="slider-dots">
            <ul className="slider-dot"> {dots}</ul>
          </div>
        </div>
    )
  };

  return (
    <section className="slider">
      <div className="slider-elements">
        <Slider {...sliderSettings}>
          {images.map((image) => (
            <HeroItem key={image._id} imageSrc={image.img} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Hero;
