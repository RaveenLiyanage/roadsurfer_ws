import React, { useState, useEffect } from "react";
import axios from "axios";

const StationSelection = ({ setStationId, setWeek }) => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState();

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    const response = await axios.get(
      "https://605c94c36d85de00170da8b4.mockapi.io/stations");
    setStations(response.data);
  };

  const handleStationSelect = (event) => {
    setStationId(event.target.value);
    setSelectedStation(event.target.value);
    setWeek(1);
  };

  return (
    <div>
      <select value={selectedStation? selectedStation.id : stations[0]?.id} onChange={handleStationSelect}>
        {stations.map((station) => (
          <option key={station.id} value={station.id}>
            {station.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StationSelection;
