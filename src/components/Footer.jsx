/** @format */

import React from "react";
import { GrInstagram } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className='bg-indigo-900 w-full py-10 text-white flex flex-col gap-8 items-center font-medium'>
      <div className='flex items-center justify-center sm:justify-between flex-wrap gap-6 text-xl'>
        <a href='' className=' hover:text-gray-300'>
          Terms Of Use{" "}
        </a>
        <a href='' className=' hover:text-gray-300'>
          Privacy-Policy
        </a>
        <a
          href='https://github.com/anurag090697/FreshPotato/blob/main/README.md'
          target='blank'
          className=' hover:text-gray-300'
        >
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
          FreshPotato is a modern web application showcasing advanced features
          such as skeleton loading, infinite scrolling, Redux for state
          management, and Tailwind CSS for styling. This project demonstrates
          efficient user interface techniques and scalable front-end
          architecture.
        </p>
      </div>
      <div className='flex items-center justify-between gap-6 text-3xl'>
        <a
          href='https://www.instagram.com/im__niks/'
          target='blank'
          className='bg-indigo-800 p-3 rounded-full hover:shadow-[0_0_10px_rgba(236,72,153,0.5)] hover:text-rose-400 transition-all duration-300'
        >
          <GrInstagram />
        </a>
        <a
          href='https://www.facebook.com/cool.niks213'
          target='blank'
          className='bg-indigo-800 p-3 rounded-full hover:shadow-[0_0_10px_rgba(236,72,153,0.5)] hover:text-rose-400 transition-all duration-300'
        >
          <FaFacebook />
        </a>
        <a
          className='bg-indigo-800 p-3 rounded-full hover:shadow-[0_0_10px_rgba(236,72,153,0.5)] hover:text-rose-400 transition-all duration-300'
          href='https://github.com/anurag090697'
          target='blank'
        >
          <FaGithub />
        </a>
        <a
          href='https://www.linkedin.com/in/anurag-shukla-31b70421b/'
          target='blank'
          className='bg-indigo-800 p-3 rounded-full hover:shadow-[0_0_10px_rgba(236,72,153,0.5)] hover:text-rose-400 transition-all duration-300'
        >
          <FaLinkedinIn />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
