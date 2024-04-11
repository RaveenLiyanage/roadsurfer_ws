import React, { useState } from "react";

function Header({setWeek}) {
  const [currentWeek, setCurrentWeek]=useState(1)

  const handlePrevious = ()=> {
    currentWeek === 0? setCurrentWeek(currentWeek) : setCurrentWeek(currentWeek-1);
    setWeek(currentWeek);
  }

  const handleNext = ()=> {
    setCurrentWeek(currentWeek+1);
    setWeek(currentWeek);
  }
  return (
    <div className="flex flex-row justify-around w-full p-5 bg-slate-900">
      <button className='p-5 text-2xl bg-red-300 border-black border-solid rounded-md h-2/4' onClick={handlePrevious}>Previous</button>
      <div className="text-4xl text-zinc-200">
        Weekly Bookings
      </div>
      <button className='p-5 text-2xl bg-red-300 border-black border-solid rounded-md h-2/4' onClick={handleNext}>Next</button>
    </div>
  );
}

export default Header;
