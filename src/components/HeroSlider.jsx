import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    title: "Discover Life Lessons",
    desc: "Learn from experiences of real people and grow daily.",
    img: "/hero1.jpg",
  },
  {
    title: "Master Your Skills",
    desc: "Step-by-step guidance to implement lessons into life.",
    img: "/hero2.jpg",
  },
  {
    title: "Join the Community",
    desc: "Connect with like-minded learners worldwide.",
    img: "/hero3.jpg",
  },
];

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[500px] w-full">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
              <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg max-w-xl">{slide.desc}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
