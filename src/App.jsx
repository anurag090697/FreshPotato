/** @format */

import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SearchResult from "./components/SearchResult";
import DetailedInfo from "./components/DetailedInfo";
// import ContentCard from "./components/ContentCard";
import ContentGroup from "./components/ContentGroup";
import Movies from "./components/Movies";
import TvShows from "./components/TvShows";
import ContentCardSkeleton from "./components/CardSkeleton";

function App() {
  return (
    <BrowserRouter>
      <div className='container pt-20 bg-gradient-to-t from-amber-900 to-violet-900 relative w-full scroll-smooth min-w-full'>
        <Header></Header>
        {/* {console.log(import.meta.env.VITE_TMDB_API_KEY)} */}
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route
            path='/searched/:searchQuery'
            element={<SearchResult></SearchResult>}
          ></Route>
          <Route
            path='/searched/:searchQuery/detailed'
            element={<DetailedInfo />}
          ></Route>
          <Route
            path='/contentcard'
            element={<ContentCardSkeleton></ContentCardSkeleton>}
          ></Route>
          <Route path='/movies' element={<Movies></Movies>}></Route>
          <Route path='/tvshows' element={<TvShows></TvShows>}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
