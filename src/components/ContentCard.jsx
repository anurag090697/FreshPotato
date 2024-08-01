/** @format */

import React, { useEffect, useState } from "react";
import xposter from "../../public/no-poster.png";
import genere from "./genere.json";

import { useNavigate } from "react-router-dom";
// import ContentCardSkeleton from "./CardSkeleton";
const img_base_path = "https://image.tmdb.org/t/p/original/";

function ContentCard(props) {
  const [rating, setRating] = useState({ percent: 0, num: 0 });
  const navigate = useNavigate();
  // const data = {
  //   adult: false,
  //   backdrop_path: "/bHk0YIZ1sgdJ2LneZpB2sF4XBSU.jpg",
  //   genre_ids: [35, 10402, 10751],
  //   id: 14123,
  //   original_language: "en",
  //   original_title: "Bratz",
  //   overview:
  //     "The popular Bratz dolls come to life in their first live-action feature film. Finding themselves being pulled further and further apart, the fashionable four band together to fight peer pressure, learn what it means to stand up for your friends, be true to oneself and live out your dreams.",
  //   popularity: 53.562,
  //   poster_path: "/nkhA8Crs7K0JHIZgSdvBeBe2QF2.jpg",
  //   release_date: "2007-08-03",
  //   title: "Bratz",
  //   video: false,
  //   vote_average: 5.683,
  //   vote_count: 415,
  // };

  const [data, setData] = useState();
  function makedate(temp) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(temp);
    return date.toLocaleDateString("en-US", options);
  }

  function ratingnum() {
    let rp = (Number(data.vote_average) / 10) * 100;
    let rn = Number(data.vote_average) + "";
    let nrn = Number(rn.substring(0, 3));
    // if (rn.length > 2) {
    //   nrn = Number(nrn) + .1;
    // }

    setRating({ percent: rp, num: nrn });
    // console.log(typeof nrn);
  }
  // console.log(data);

  useEffect(() => {
    setData(props.data);
    // ratingnum();
  }, []);

  useEffect(() => {
    if (data) ratingnum();
  }, [data]);

  function getgenere() {
   
    let tm = data.genre_ids.map((ele, idx) => {
     
      return idx < 2 ? (
        <div
          key={idx}
          className='bg-orange-500 text-gray-200 p-1 rounded-lg text-xs w-fit border'
        >
          <p>{genere[ele]}</p>
        </div>
      ) : (
        ""
      );
    });
    return tm;
  }

  if (!data) {
    return <div>Loading</div>;
  }
  // console.log(data);
  return (
    <div
      className='w-60 h-[520px] rounded-lg border-gray-200 overflow-hidden flex flex-col '
      onClick={() =>
        navigate(`/searched/${data.title || data.name}/detailed`, {
          state: { data },
        })
      }
    >
      <div className='relative pb-8 '>
        <img
          className='rounded-lg'
          src={
            data.poster_path ? `${img_base_path}${data.poster_path}` : xposter
          }
          alt={data.title || data.name}
        />
        {/* bg-[conic-gradient(from_0deg,var(--tw-gradient-stops))] from-green-500 from-${rating.precent}%  to-white to-${100 - rating.precent}% */}
        <div className='w-16 h-16 rounded-full bg-white p-1 absolute bottom-0 z-30'>
          <div
            className={`w-full h-full rounded-full flex items-center justify-center`}
            style={{
              background: `conic-gradient(#22c55e ${rating.percent}%, white ${rating.percent}% 100%)`,
            }}
          >
            <div className='rounded-full w-5/6 h-5/6 bg-white flex items-center justify-center'>
              {rating.num}
            </div>
          </div>
        </div>
        <div className='flex gap-2 items-center justify-end text-white absolute bottom-10 right-2 max-w-36 flex-wrap'>
          {data.genre_ids ? getgenere() : ""}
        </div>
      </div>

      <div className='py-2 text-lg text-white mt-2 px-2 flex flex-col'>
        <h2>{data.title || data.original_title || data.name}</h2>
        <hr />
        <h3 className='text-gray-400'>
          {data.release_date
            ? makedate(data.release_date)
            : makedate(data.first_air_date)}
        </h3>
      </div>
    </div>
  );
}

export default ContentCard;
