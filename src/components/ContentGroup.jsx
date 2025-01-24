/** @format */

import React, { useState } from "react";
import ContentCard from "./ContentCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ContentGroup(props) {
  const [option, setOption] = useState(true);
  // console.log(props.data1)
  return (
    <div className='w-full flex flex-col items-center justify-center px-4 ms:px-14 lg:px-28 py-20 min-h-96'>
      <div className='flex items-center justify-between w-full'>
        <h2 className='text-lg sm:text-2xl text-white'>{props.heading}</h2>
        <div
          className='flex items-center justify-around w-fit text-sm bg-white px-2 py-1 rounded-3xl cursor-pointer select-none'
          onClick={() => setOption(!option)}
        >
          <h3
            className={
              option
                ? "bg-gradient-to-r from-amber-400 to-orange-600 py-1 text-white px-2 rounded-2xl h-full text-center duration-700 ease-in-out animate-pulse"
                : "py-1 px-2 text-center duration-700"
            }
          >
            {props.option1}
          </h3>
          <h3
            className={
              option
                ? "py-1 px-2 text-center duration-700"
                : "bg-gradient-to-r from-amber-400 to-orange-600 py-1 text-white px-2 rounded-2xl duration-700 text-center ease-in-out animate-pulse"
            }
          >
            {props.option2}
          </h3>
        </div>
      </div>
      {/* <div className={`flex item-center justify-center gap-4 flex-wrap py-6`}>
        {props.data1 ? props.data1.map((ele, idx) => {
          return <ContentCard data={ele} key={idx}></ContentCard>;
        }) : ""}
      </div> */}
      <div className='py-8 w-full'>
        <Swiper
          className={option ? "" : "hidden"}
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            520: {
              slidesPerView: 1,
              spaceBetween: 6,
            },
            740: {
              slidesPerView: 2,
              spaceBetween: 6,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 4,
            },
            1680: {
              slidesPerView: 5,
            },
          }}
        >
          {props.data1 ? (
            props.data1.map((ele, idx) => {
              return (
                <SwiperSlide key={idx} className=''>
                  <ContentCard data={ele} />
                </SwiperSlide>
              );
            })
          ) : (
            <div className='flex flex-wrap gap-4 items-center justify-center'>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
            </div>
          )}
        </Swiper>
        <Swiper
          className={option ? "hidden" : ""}
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            520: {
              slidesPerView: 1,
            },
            740: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {props.data2 ? (
            props.data2.map((ele, idx) => (
              <SwiperSlide key={idx}>
                <ContentCard data={ele} />
              </SwiperSlide>
            ))
          ) : (
            <div className='flex flex-wrap gap-4 items-center justify-center'>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
            </div>
          )}
        </Swiper>
      </div>
    </div>
  );
}

export default ContentGroup;
