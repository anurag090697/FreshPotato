/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentCard from "./ContentCard";
import { fetchtvshows } from "../slice";
import InfiniteScroll from "react-infinite-scroll-component";
import ContentCardSkeleton from "./CardSkeleton";

function TvShows() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { tvshows, status, error } = useSelector((state) => state.movieReducer);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchtvshows(1));
  }, [dispatch]);

  useEffect(() => {
    if (tvshows && tvshows.results) {
      if (tvshows.page === 1) {
        setData(tvshows.results);
        // console.log(data)
      } else {
        setData((prevData) => [...prevData, ...tvshows.results]);
      }
      setPages(tvshows.total_pages);
      setCurrentPage(tvshows.page);
    }
  }, [tvshows]);

  const fetchMoreData = () => {
    if (currentPage < pages) {
      dispatch(fetchtvshows(currentPage + 1));
    }
  };
  // useEffect(() => {

  //     console.log(data);

  // }, [tvshows]);
  if (status === "loading") {
    return (
      <div className='flex flex-wrap gap-4 items-center justify-center text-transparent pt-28'>
        <ContentCardSkeleton></ContentCardSkeleton>
        <ContentCardSkeleton></ContentCardSkeleton>
        <ContentCardSkeleton></ContentCardSkeleton>
        <ContentCardSkeleton></ContentCardSkeleton>
        <ContentCardSkeleton></ContentCardSkeleton>
        <ContentCardSkeleton></ContentCardSkeleton>
        <ContentCardSkeleton></ContentCardSkeleton>
        <ContentCardSkeleton></ContentCardSkeleton>
        <ContentCardSkeleton></ContentCardSkeleton>
        <ContentCardSkeleton></ContentCardSkeleton>
        <ContentCardSkeleton></ContentCardSkeleton>
      </div>
    );
  }
  if (status === "failed") {
    return (
      <div className='min-h-dvh flex items-center justify-center w-full text-3xl text-violet-800'>
        An Error Occured Try Again
      </div>
    );
  }
  return (
    <div className='pt-20'>
      <h1 className='text-4xl text-white text-center py-10'>TV SHOWS</h1>
      <InfiniteScroll
        style={{ overflow: "visible" }}
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={currentPage < pages}
        loader={
          <div className='flex flex-wrap gap-6 items-center justify-center'>
            <ContentCardSkeleton></ContentCardSkeleton>
            <ContentCardSkeleton></ContentCardSkeleton>
            <ContentCardSkeleton></ContentCardSkeleton>
            <ContentCardSkeleton></ContentCardSkeleton>
            <ContentCardSkeleton></ContentCardSkeleton>
          </div>
        }
        endMessage={
          status === "loading" && !tvshows ? (
            <div className='flex flex-wrap gap-4 items-center justify-center'>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
              <ContentCardSkeleton></ContentCardSkeleton>
            </div>
          ) : (
            <div
              className={`text-center text-red-600 text-2xl py-10${
                tvshows.length ? "" : "min-h-dvh"
              }`}
            >
              No more TV shows to display
            </div>
          )
        }
      >
        <div className='flex gap-6 flex-wrap items-center justify-center px-20'>
          {data.map((element, index) => (
            <ContentCard data={element} key={index} media={"tv"}></ContentCard>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default TvShows;
