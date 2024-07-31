/** @format */

import React from "react";
import { GrInstagram } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className='bg-indigo-900 w-full py-10 text-white flex flex-col gap-8 items-center font-medium'>
      <div className='flex items-center justify-between gap-6 text-xl'>
        <a href='' className=' hover:text-gray-300'>
          Terms Of Use{" "}
        </a>
        <a href='' className=' hover:text-gray-300'>
          Privacy-Policy
        </a>
        <a href='' className=' hover:text-gray-300'>
          About
        </a>
        <a href='' className=' hover:text-gray-300'>
          Blog
        </a>
        <a href='' className=' hover:text-gray-300'>
          FAQ
        </a>
      </div>
      <div className='w-3/5 text-center text-gray-400'>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>
      <div className='flex items-center justify-between gap-6 text-3xl'>
        <a
          href=''
          className='bg-indigo-800 p-3 rounded-full hover:shadow-[0_0_10px_rgba(236,72,153,0.5)] hover:text-rose-400 transition-all duration-300'
        >
          <GrInstagram />
        </a>
        <a
          href=''
          className='bg-indigo-800 p-3 rounded-full hover:shadow-[0_0_10px_rgba(236,72,153,0.5)] hover:text-rose-400 transition-all duration-300'
        >
          <FaFacebook />
        </a>
        <a
          className='bg-indigo-800 p-3 rounded-full hover:shadow-[0_0_10px_rgba(236,72,153,0.5)] hover:text-rose-400 transition-all duration-300'
          href='
              '
        >
          <FaGithub />
        </a>
        <a
          href=''
          className='bg-indigo-800 p-3 rounded-full hover:shadow-[0_0_10px_rgba(236,72,153,0.5)] hover:text-rose-400 transition-all duration-300'
        >
          <FaLinkedinIn />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
