import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";
export const AppSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  return (
    <Slider {...settings}>
      {Array(5)
        .fill(0)
        .map((el, index) => (
          <div key={index} className="slider">
            <img src={`/slider/${index + 1}.jpg`} alt="banner" />
          </div>
        ))}
    </Slider>
  );
};
export default AppSlider;
