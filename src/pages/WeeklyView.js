import React, { useState } from "react";
import StationSelection from "../components/StationSelection/StationSelection";
import Booking from "../components/Bookings/Booking";
import Header from "../components/Header/Header";

function WeeklyView() {
  const [stationId, setStationId] = useState(1);

  return (
    <div className="flex flex-col w-full h-full bg-slate-100">
      <Header />
      <StationSelection
        setStationId={setStationId}
      />
      <Booking stationId={stationId} />
    </div>
  );
}

export default WeeklyView;
