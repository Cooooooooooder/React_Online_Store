import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./HeroSlider.css";

import hero1 from "../../img/banner_Hero1.jpg";
import hero2 from "../../img/banner_Hero2.jpg";
import hero3 from "../../img/banner_Hero3.jpg";

// عدّل النصوص هنا عشان تناسب كل صورة
const slides = [
  {
    id: 1,
    subtitle: "Introducing the new",
    title: ["Microsoft Xbox", "360 Controller"],
    text: "Windows Xp/10/7/8 Ps3, Tv Box",
    image: hero1,
    link: "/",
  },
  {
    id: 2,
    subtitle: "Best deals on",
    title: ["Gaming Accessories", "& Headsets"],
    text: "Top quality gear at unbeatable prices",
    image: hero2,
    link: "/",
  },
  {
    id: 3,
    subtitle: "Don't miss our",
    title: ["Mega Sale", "Up To 50% Off"],
    text: "Limited time offers on selected products",
    image: hero3,
    link: "/",
  },
];

function HeroSlider() {
  return (
    <div className="hero">
      <div className="container">
        <Swiper
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="content">
                <h4>{slide.subtitle}</h4>

                <h3>
                  {slide.title.map((line, i) => (
                    <Fragment key={i}>
                      {line}
                      {i < slide.title.length - 1 && <br />}
                    </Fragment>
                  ))}
                </h3>

                <p>{slide.text}</p>

                <Link to={slide.link} className="btn">
                  Shop Now
                </Link>
              </div>

              <img src={slide.image} alt={slide.title.join(" ")} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default HeroSlider;