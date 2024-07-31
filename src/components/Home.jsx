/** @format */

import React, { useEffect } from "react";
import Hero from "./Hero";
import ContentGroup from "./ContentGroup";
import { useDispatch, useSelector } from "react-redux";
// import arr1 from "../allsearch.json/";
// import arr2 from "../Untitled-1.json/";
import {
  fetchPopularContent,
  fetchtopratedcontent,
  fetchTrendingContent,
} from "../slice";
function Home() {
  // console.log(arr2.recommendedcontent)
  const dispatch = useDispatch();
  const {
    trendingday,
    trendingweek,
    topratedmovies,
    topratedshows,
    popularmovies,
    populartvshows,
    status,
    error,
  } = useSelector((state) => state.movieReducer);
  // console.log(
  //   trendingday,
  //   trendingweek,
  //   topratedmovies,
  //   topratedshows,
  //   popularmovies,
  //   populartvshows,
  //   status,
  //   error
  // );
  useEffect(() => {

    dispatch(fetchTrendingContent());
    dispatch(fetchtopratedcontent());
    dispatch(fetchPopularContent());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchtopratedcontent());
  // }, [dispatch]);
  // useEffect(() => {
  //   dispatch(fetchpopularcontent());
  // }, [dispatch]);

  return (
    <div>
      <Hero pictures={trendingday}></Hero>
      <ContentGroup
        heading={"Trending"}
        option1={"DAY"}
        option2={"WEEK"}
        data1={trendingday}
        data2={trendingweek}
      ></ContentGroup>
      <ContentGroup
        heading={"What's Popular"}
        option1={"MOVIES"}
        option2={"TV SHOWS"}
        data1={topratedmovies}
        data2={topratedshows}
      ></ContentGroup>
      <ContentGroup
        heading={"Top Rated"}
        option1={"MOVIES"}
        option2={"TV SHOWS"}
        data1={popularmovies}
        data2={populartvshows}
      ></ContentGroup>
    </div>
  );
}

export default Home;
