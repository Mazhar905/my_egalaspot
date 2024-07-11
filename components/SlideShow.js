// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import TextButton from './Buttons';
import "../pages/styles/SlideShow.module.css"

import { Autoplay, Pagination, Navigation } from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/swiper-bundle.css'; // Ensure correct path to CSS file
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const sliders = [
  {
    id: 2,
    image: "/bg-img/curly_hair_girl-1.jpg",
    imageTablet: "/bg-img/curly_hair_girl-1-tablet.png",
    imageMobile: "/bg-img/curly_hair_girl-1_mobile.jpg",
    subtitle: "50% off",
    titleUp: "New Cocktail",
    titleDown: "Dresses",
    rightText: false,
  },
  {
    id: 1,
    image: "/bg-img/curly_hair_white-1.jpg",
    imageTablet: "/bg-img/curly_hair_white-1-tablet.png",
    imageMobile: "/bg-img/curly_hair_white-1_mobile.jpg",
    subtitle: "Spring Revolution",
    titleUp: "Night Summer",
    titleDown: "Dresses",
    rightText: true,
  },
  {
    id: 3,
    image: "/bg-img/monigote.jpg",
    imageTablet: "/bg-img/monigote-tablet.png",
    imageMobile: "/bg-img/monigote_mobile.jpg",
    subtitle: "Spring promo",
    titleUp: "The Weekend",
    titleDown: "Promotions",
    rightText: false,
  },
];

const SlideShow = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={0}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        type: "fraction",
        dynamicBullets: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper cursor-pointer"
    >
      {sliders.map((slider) => (
        <SwiperSlide key={slider.id}>
          <div className="hidden lg:block">
            <Image
              layout="responsive"
              src={slider.image}
              width={1144}
              height={572}
              alt={"some name"}
            />
          </div>
          <div className="hidden sm:block lg:hidden">
            <Image
              layout="responsive"
              src={slider.imageTablet}
              width={820}
              height={720}
              alt={"some name"}
            />
          </div>
          <div className="sm:hidden">
            <Image
              layout="responsive"
              src={slider.imageMobile}
              width={428}
              height={800}
              alt={"some name"}
            />
          </div>
          <div
            className={
              slider.rightText
                ? "w-11/12 absolute bg-white p-4 opacity-90 sm:bg-transparent sm:p-0 sm:opacity-100 bottom-10 right-1/2 transform translate-x-1/2 sm:transform-none sm:top-1/3 sm:right-12 md:right-20 lg:right-40 flex flex-col items-center sm:items-end"
                : "w-11/12 absolute bg-white p-4 opacity-90 sm:bg-transparent sm:p-0 sm:opacity-100 bottom-10 left-1/2 transform -translate-x-1/2 sm:transform-none sm:top-1/3 sm:left-12 md:left-20 lg:left-40 flex flex-col items-center sm:items-start"
            }
          >
            <span className="bg-gray-500 text-gray-100 inline-block text-base sm:text-xs p-1 px-3 rounded-md">{slider.subtitle}</span>
            <span
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl my-4 text-center ${slider.rightText ? "sm:text-right" : "sm:text-left"
                }`}
            >
              {slider.titleUp} <br />
              {slider.titleDown}
            </span>
            <TextButton value="SHOP NOW" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideShow;