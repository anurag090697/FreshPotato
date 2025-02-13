/** @format */

import React, { useEffect, useReducer, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import xposter from "../../public/no-poster.png";
import { useDispatch, useSelector } from "react-redux";
import { detailedContent } from "../slice";
// import contentDetailed from "./contentDetailed.json";
import ContentCard from "./ContentCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ContentCardSkeleton from "./CardSkeleton";
import Skeleton from "react-loading-skeleton";
import profile from "../../public/profile.jpeg";
const img_base_path = "https://image.tmdb.org/t/p/original/";

function DetailedInfo(props) {
  const location = useLocation();
  const dispatch = useDispatch();

  const contentname = location.pathname;

  const [rating, setRating] = useState({ percent: 0, num: 0 });

  const { data } = location.state || {};
  const contentid = data.id;
  let contenttype = data.media_type || data.release_date ? "movie" : "tv";

  // console.log(contenttype);
  useEffect(() => {
    dispatch(
      detailedContent({ contentId: contentid, contentType: contenttype })
    );
  }, [contentname]);

  const {
    contentDetailed,
    similarcontent,
    recommendedcontent,
    credits,
    status,
    error,
  } = useSelector((state) => state.movieReducer);

  // console.log(contentDetailed, similarcontent, recommendedcontent, contentid);
  console.log(credits);

  function ratingnum() {
    let rp = (Number(data.vote_average) / 10) * 100;
    let rn = data.vote_average + "";
    let nrn = Number(rn.substring(0, 3));

    setRating({ percent: rp, num: nrn });
  }

  useEffect(() => {
    if (contentDetailed) ratingnum();
    // console.log(rating)
  }, [contentDetailed]);

  if (status === "loading") {
    return (
      <div className='py-20'>
        <div className='flex flex-wrap gap-32 items-center justify-center'>
          {" "}
          <Skeleton
            width={300}
            height={350}
            enableAnimation='true'
            baseColor='silver'
            highlightColor='gray'
            direction='ltr'
          ></Skeleton>
          <div className='flex flex-col '>
            {" "}
            <Skeleton
              className='my-6'
              width={600}
              enableAnimation='true'
              baseColor='silver'
              highlightColor='gray'
              direction='ltr'
              count={5}
            ></Skeleton>
          </div>
        </div>
        <div>
          <Skeleton
            containerClassName='flex items-center justify-center gap-5'
            className='my-10'
            width={200}
            circle={true}
            height={200}
            enableAnimation='true'
            baseColor='silver'
            highlightColor='gray'
            direction='ltr'
            count={5}
          ></Skeleton>
        </div>
        <div className='my-16'>
          <div>
            {" "}
            <Skeleton
              width={220}
              height={300}
              enableAnimation='true'
              baseColor='silver'
              highlightColor='gray'
              direction='ltr'
              count={5}
              containerClassName='flex gap-4 items-center justify-center w-full'
            ></Skeleton>
          </div>
          <div>
            {" "}
            <Skeleton
              width={220}
              enableAnimation='true'
              baseColor='silver'
              highlightColor='gray'
              direction='ltr'
              containerClassName='flex gap-4 items-center justify-center w-full'
              count={5}
            ></Skeleton>
          </div>
          <div>
            {" "}
            <Skeleton
              width={220}
              enableAnimation='true'
              baseColor='silver'
              highlightColor='gray'
              direction='ltr'
              containerClassName='flex gap-4 items-center justify-center w-full'
              count={5}
            ></Skeleton>
          </div>
        </div>
      </div>
    );
  }
  if (status === "failed") {
    return (
      <div className='h-dvh flex items-center justify-center w-full text-3xl text-rose-600'>
        An Error Occured Try Again
      </div>
    );
  }
  return (
    <div
      className='w-full h-full bg-fixed bg-top bg-no-repeat bg-cover'
      style={{
        backgroundImage: `url(${img_base_path}${contentDetailed.backdrop_path})`,
      }}
    >
      <div className='w-full h-full bg-black/70 pt-20'>
        <div className='flex py-10 items-center justify-center md:justify-start flex-wrap lg:flex-nowrap gap-10 px-4 md:px-20 w-full'>
          <div className=' min-w-64 sm:min-w-96'>
            <img
              className='rounded-xl object-cover object-top max-h-[450px]'
              src={
                contentDetailed.poster_path
                  ? `${img_base_path}${contentDetailed.poster_path}`
                  : xposter
              }
              alt={contentDetailed.title}
            />
          </div>
          <div className=' text-white flex flex-col items-center justify-center md:items-start gap-4 select-none pt-5'>
            <h2 className=' text-3xl'>
              {contentDetailed.title ||
                contentDetailed.original_title ||
                contentDetailed.name}
            </h2>
            <h3 className='text-gray-400'>{contentDetailed.tagline}</h3>
            <div className='flex gap-6 item-center'>
              {contentDetailed.genres
                ? contentDetailed.genres.map((ele) => {
                    return (
                      <div
                        key={ele.id}
                        className='bg-amber-600 rounded-lg w-fit p-1'
                      >
                        <p>{ele.name}</p>
                      </div>
                    );
                  })
                : " "}
            </div>
            {/* <div>
            <>{contentDetailed.vote_average}</>
          </div> */}
            <div className='w-20 h-20 rounded-full bg-white p-1'>
              <div
                className={`w-full h-full rounded-full flex items-center justify-center`}
                style={{
                  background: `conic-gradient(#22c55e ${rating.percent}%, white ${rating.percent}% 100%)`,
                }}
              >
                <div className='rounded-full w-5/6 h-5/6 bg-white flex items-center justify-center text-sky-500 text-2xl'>
                  {rating.num}
                </div>
              </div>
            </div>
            <h2 className='text-xl md:text-2xl'>Overview</h2>
            <p className="text-xs md:text-lg w-full text-wrap">
              {contentDetailed.overview ? (
                contentDetailed.overview
              ) : (
                <span className='text-red-700'> No overview available</span>
              )}
            </p>
            <div className='flex gap-2 md:gap-6 flex-wrap'>
              <h4>
                Status:{" "}
                <span className='text-gray-400 ml-2'>
                  {contentDetailed.status}
                </span>{" "}
              </h4>{" "}
              <h4>
                {contentDetailed.release_date
                  ? "Release Date:"
                  : "First Aired:"}
                <span className='text-gray-400 ml-2'>
                  {contentDetailed.release_date ||
                    contentDetailed.first_air_date}
                </span>
              </h4>
              <h4>
                {contentDetailed.runtime ? "Runtime:" : "Total Episodes:"}

                <span className='text-gray-400 ml-2'>
                  {contentDetailed.runtime ||
                    contentDetailed.number_of_episodes}
                </span>
              </h4>
            </div>
            <hr />
            {contentDetailed.seasons ? (
              <>
                {" "}
                <div className='flex item-center gap-4 text-gray-400'>
                  {" "}
                  <h3 className='text-white'>Created By :</h3>
                  {contentDetailed.created_by.map((ele, idx) => {
                    return <p key={idx}>{ele.name},</p>;
                  })}
                </div>
                <hr />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className='w-full px-6 sm:px-2 sm:w-10/12 mx-auto py-20'>
          {credits.cast ? (
            <h2 className='text-3xl text-white ml-8 py-6'>CAST</h2>
          ) : (
            ""
          )}
          <Swiper
            className=''
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
            {credits
              ? credits.map((ele, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      <div className='flex flex-col items-center justify-center text-xl text-sky-400'>
                        <div className='overflow-hidden rounded-full'>
                          {" "}
                          <img
                            src={
                              ele.profile_path
                                ? img_base_path + ele.profile_path
                                : profile
                            }
                            alt=''
                            className='w-56 rounded-full object-cover h-56 grayscale hover:scale-110 hover:grayscale-0'
                          />
                        </div>
                        <div className='text-center flex flex-col items-center justify-center gap-4 py-2'>
                          <h3>{ele.name || "Not Available"}</h3>
                          <h3>{ele.character || "Not Available"}</h3>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })
              : ""}
          </Swiper>
        </div>
        <div>
          <h2 className='mx-auto w-fit sm:ml-32 mt-8 text-xl sm:text-3xl text-white uppercase'>
            {similarcontent
              ? data.media_type === "movie"
                ? "SIMILAR MOVIES"
                : data.release_date
                ? "SIMILAR MOVIES"
                : "SIMILAR TV SHOWS"
              : ""}
          </h2>
          <div className='my-14 w-10/12 mx-auto flex gap-6'>
            {/* {similarcontent
              ? similarcontent.map((ele, idx) => {
                  // console.log(ele);
                  return idx < 5 ? (
                    <ContentCard data={ele} key={idx}></ContentCard>
                  ) : (
                    ""
                  );
                })
              : ""} */}
            <Swiper
              className=''
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
              {similarcontent ? (
                similarcontent.map((ele, idx) => {
                  return (
                    <SwiperSlide key={idx}>
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
                </div>
              )}
            </Swiper>
          </div>
        </div>
        <hr className='mx-20' />
        <div>
          <h2 className='mx-auto w-fit sm:ml-32 mt-8 text-xl sm:text-3xl text-white uppercase'>
            {" "}
            recommendations
          </h2>
          <div className='py-14 w-10/12 mx-auto flex gap-6'>
            {/* {recommendedcontent
              ? recommendedcontent.map((ele, idx) => {
                  return idx < 5 ? (
                    <ContentCard data={ele} key={idx}></ContentCard>
                  ) : (
                    ""
                  );
                })
              : ""} */}
            <Swiper
              className=''
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
              {recommendedcontent ? (
                recommendedcontent.map((ele, idx) => {
                  return (
                    <SwiperSlide key={idx}>
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
                </div>
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedInfo;
