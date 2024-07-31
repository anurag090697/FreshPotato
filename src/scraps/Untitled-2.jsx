/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentCard from "./ContentCard";
import { fetchmovies } from "../slice";

function Movies() {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movieReducer);

  useEffect(() => {
    dispatch(fetchmovies(1));
  }, []);

  useEffect(() => {
    setData(movies.results);
  }, [movies]);

  //   console.log(data);
  return (
    <div>
      <h1 className='text-4xl text-white text-center py-10'>MOVIES</h1>
      <div className='flex gap-6 flex-wrap items-center justify-center px-20'>
        {data
          ? data.map((element, index) => {
              return (
                <ContentCard
                  data={element}
                  key={index}
                  media={"movie"}
                ></ContentCard>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default Movies;
