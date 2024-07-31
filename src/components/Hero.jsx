/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const img_base_path = "https://image.tmdb.org/t/p/original/";

function Hero(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [picslide, setPicSlide] = useState();
  const [picidx, setPicIdx] = useState(0);
  const navigate = useNavigate();
  //   const [warnview, setWarnview] = useState(false);

  useEffect(() => {
    if (props.pictures) {
      let tm = props.pictures
        .filter((element) => element.backdrop_path)
        .map((element) => img_base_path + element.backdrop_path);
      setPicSlide(tm);
    }
  }, [props.pictures]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPicIdx((prevIdx) => {
        if (picslide && prevIdx + 1 < picslide.length) {
          return prevIdx + 1;
        } else {
          return 0;
        }
      });
    }, 6000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [picslide]);

  function handleSubmit(e) {
    e.preventDefault(e);
    if (searchQuery === "" || searchQuery.length <= 3) {
      alert("Please provide a valid input...");
    } else {
      navigate("/searched/" + searchQuery);
      setSearchQuery("");
    }
  }
  return (
    <div
      className=' w-full bg-cover bg-top Class
Properties
bg-repeat	background-repeat: repeat;
bg-no-repeat'
      style={{
        backgroundImage: `url(${picslide ? picslide[picidx] : ""})`,
      }}
    >
      <div className='flex flex-col w-full items-center px-8 text-center gap-10 bg-gradient-to-r from-indigo-900/50 to-violet-900/40 justify-center py-52 text-white'>
        <div>
          <h1 className='font-bold text-6xl'>Welcome.</h1>
          <p className='font-medium text-gray-300 text-2xl'>
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
        </div>
        <div className='w-full py-3'>
          <form
            action='submit'
            onSubmit={(e) => handleSubmit(e)}
            className='flex items-center justify-center'
          >
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              type='text'
              className='p-3 w-3/5 rounded-ss-2xl rounded-es-2xl text-2xl font-medium px-6 text-gray-600 outline-none'
              placeholder='Search For Any Movie Or TV Show.....'
            />
            <button className='text-white bg-gradient-to-r from-amber-300 to-orange-500 text-2xl font-medium py-3 px-5 rounded-se-2xl rounded-ee-2xl hover:from-orange-500 hover:to-yellow-500'>
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Hero;
