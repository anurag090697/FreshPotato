/** @format */

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchContent } from "../slice";
import xposter from "../../public/no-poster.png";
import ContentCardSkeleton from "./CardSkeleton";
import ContentCard from "./ContentCard";
const img_base_path = "https://image.tmdb.org/t/p/original/";

function SearchResult() {
  const { searchQuery } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchContent(searchQuery));
  }, [dispatch, searchQuery]);

  const { searchResults, status, error } = useSelector(
    (state) => state.movieReducer
  );

  if (status === "loading") {
    return (
      <div className='flex flex-wrap gap-4 items-center justify-center pt-40'>
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
        <ContentCardSkeleton></ContentCardSkeleton>
        <ContentCardSkeleton></ContentCardSkeleton>
        <ContentCardSkeleton></ContentCardSkeleton>
        <ContentCardSkeleton></ContentCardSkeleton>
        <ContentCardSkeleton></ContentCardSkeleton>
        <ContentCardSkeleton></ContentCardSkeleton>
        <ContentCardSkeleton></ContentCardSkeleton>
      </div>
    );
  } else if (status === "failed") {
    return (
      <div className='min-h-dvh text-center w-full text-3xl text-violet-800'>
        An Error Occured Try Again
      </div>
    );
  }
  return (
    <div>
      <div className='flex items-center justify-center flex-wrap gap-16 px-20 py-10 pt-32'>
        {searchResults.map((result, idx) => (
          <ContentCard data={result} key={idx}>
            {" "}
          </ContentCard>
        ))}
      </div>
    </div>
  );
}

export default SearchResult;

// <div
//   onClick={() =>
//     navigate(`/searched/${searchQuery}/detailed`, {
//       state: { result },
//     })
//   }
//   key={result.id}
//   className='w-56 bg-amber-200 rounded-xl text-center h-96'
// >
//   <div>
//     <img
//       className='rounded-xl h-72 w-full object-cover object-top'
//       src={
//         result.poster_path
//           ? `${img_base_path}${result.poster_path}`
//           : result.profile_path ? `${img_base_path}${result.profile_path}` : xposter
//       }
//       alt={result.title}
//     />
//   </div>
//   <div className='px-2 py-4'>
//     <h3>{result.title || result.name}</h3>
//   </div>
// </div>
