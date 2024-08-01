/** @format */

import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, Route } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import logo from "../../public/movieflixlogo.png";

function Header() {
  const [visibility, setVisibility] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          // if scroll down hide the navbar
          setIsVisible(false);
        } else {
          // if scroll up show the navbar
          setIsVisible(true);
        }

        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(searchQuery);
    navigate("/searched/" + searchQuery);
    setSearchQuery("");
  }

  return (
    <header
      className={`z-30 fixed w-full top-0 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className='bg-gradient-to-r from-gray-500/50 to-cyan-500/50 w-full flex px-20 py-1 items-center justify-between text-2xl font-medium text-white '>
        <NavLink to='/'>
          <img
            src={logo}
            alt='MovieFlix Logo'
            className='w-20 md:w-28 animate-pulse hover:animate-none'
          />
        </NavLink>

        <div className='flex items-center justify-between gap-8'>
          <div className='text-xs md:text-xl flex gap-6'>
            <NavLink
              to='/movies'
              className={({ isActive }) => (isActive ? "text-rose-500" : "")}
            >
              MOVIES
            </NavLink>
            <NavLink
              to='/tvshows'
              className={({ isActive }) => (isActive ? "text-rose-500" : "")}
            >
              TV SHOWS
            </NavLink>
          </div>

          <button onClick={() => setVisibility(!visibility)}>
            <IoSearch />
          </button>
        </div>
      </nav>
      {visibility && (
        <div
          className='px-40 relative flex z-20 bg-gray-300 my-4'
          id='extraSearch'
        >
          <form
            action='submit'
            onSubmit={(e) => handleSubmit(e)}
            className='w-full'
          >
            <input
              value={searchQuery}
              type='text'
              className='w-full text-xl bg-gray-300 text-lime-700 font-medium px-6 py-4 outline-lime-600'
              placeholder='Search For Any Movie or TV Show....'
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
          </form>

          <button className='text-3xl' onClick={() => setVisibility(false)}>
            <IoIosCloseCircle />
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
