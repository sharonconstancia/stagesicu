import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { EffectFade } from 'swiper/modules';
import { TypeAnimation } from 'react-type-animation';

const Slide = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper w-full h-full'
      >
        <SwiperSlide>
          <img
            src='istockphoto-1320543832-612x612.jpg'
            alt=''
            className='w-full h-full object-cover'
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='istockphoto-1263074286-612x612.jpg'
            alt=''
            className='w-full h-full object-cover'
          />{' '}
        </SwiperSlide>
        <SwiperSlide>
          <img src='istockphoto-1146044937-612x612.jpg' alt='' className='w-full h-full object-cover' />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='istockphoto-1133455893-612x612.jpg'
            alt=''
            className='w-full h-full object-cover'
          />{' '}
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slide;
