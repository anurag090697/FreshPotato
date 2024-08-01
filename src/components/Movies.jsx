/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentCard from "./ContentCard";
import { fetchmovies } from "../slice";
import InfiniteScroll from "react-infinite-scroll-component";
import ContentCardSkeleton from "./CardSkeleton";

function Movies() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { movies, status, error } = useSelector((state) => state.movieReducer);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchmovies(1));
  }, [dispatch]);

  useEffect(() => {
    if (movies && movies.results) {
      if (movies.page === 1) {
        setData(movies.results);
      } else {
        setData((prevData) => [...prevData, ...movies.results]);
      }
      setPages(movies.total_pages);
      setCurrentPage(movies.page);
    }
  }, [movies]);

  const fetchMoreData = () => {
    if (currentPage < pages) {
      dispatch(fetchmovies(currentPage + 1));
    }
  };
  if (status === "loading") {
    return (
      <div className='flex flex-wrap gap-6 items-center justify-center text-transparent pt-28'>
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
      <h1 className='text-4xl text-white text-center py-10'>MOVIES</h1>
      <InfiniteScroll
        style={{ overflow: "visible" }}
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={currentPage < pages}
        loader={
          <div className='flex flex-wrap gap-4 items-center justify-center text-transparent'>
            <ContentCardSkeleton></ContentCardSkeleton>
            <ContentCardSkeleton></ContentCardSkeleton>
            <ContentCardSkeleton></ContentCardSkeleton>
            <ContentCardSkeleton></ContentCardSkeleton>
            <ContentCardSkeleton></ContentCardSkeleton>
            <ContentCardSkeleton></ContentCardSkeleton>
            <ContentCardSkeleton></ContentCardSkeleton>
            <ContentCardSkeleton></ContentCardSkeleton>
          </div>
        }
        endMessage={
          status === "loading" && !movies ? (
            <div className='flex flex-wrap gap-4 items-center justify-center text-transparent'>
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
                movies.length ? "" : "min-h-dvh"
              }`}
            >
              No more TV shows to display
            </div>
          )
        }
      >
        <div className='flex gap-6 flex-wrap items-center justify-center px-20'>
          {data.map((element, index) => (
            <ContentCard
              data={element}
              key={index}
              media={"movie"}
            ></ContentCard>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Movies;
