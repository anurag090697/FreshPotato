/** @format */

import React, { useEffect } from "react";

function TypeContent() {
  const [show, setShow] = useEffect(true);
  return (
    <div className='flex justify-between'>
      <h2>{Heading}</h2>
      <div className='w-fit bg-gray p-1 pointer'>
        <p className={show ? "bg-amber-400" : ""} onClick={() => setShow(true)}>{option1}</p>
        <p className={show ? "" : "bg-amber-400"} onClick={() => setShow(false)}>{option2}</p>
      </div>
    </div>
  );
}

export default TypeContent;
