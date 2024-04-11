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
    <div className="flex flex-row justify-around w-full">
      <button onClick={handlePrevious}>Previous</button>
      <div className="text-4xl">
        Weekly Bookings
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default Header;
