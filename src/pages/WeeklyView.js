import React, { useState } from "react";
import Header from "../components/Header/Header";
import StationSelection from "../components/StationSelection/StationSelection";
import Booking from "../components/Bookings/Booking";

function WeeklyView() {
  const [week, setWeek] = useState();
  const [stationId, setStationId] = useState(1);
  return (
    <div className="flex flex-col w-full h-full">
      <Header setWeek={setWeek} />
      <StationSelection setStationId={setStationId} setWeek={setWeek}/>
      <Booking week={week} stationId={stationId}/>
    </div>
  );
}

export default WeeklyView;
