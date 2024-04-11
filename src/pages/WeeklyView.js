import React, { useState } from "react";
import StationSelection from "../components/StationSelection/StationSelection";
import Booking from "../components/Bookings/Booking";
import Header from "../components/Header/Header";

function WeeklyView() {
  const [stationId, setStationId] = useState(1);
  const [stationName, setStationName] = useState();
  return (
    <div className="flex flex-col w-full h-full bg-slate-300">
      <Header />
      <StationSelection setStationId={setStationId} setStationName={setStationName}/>
      <Booking  stationId={stationId} stationName={stationName}/>
    </div>
  );
}

export default WeeklyView;
