import React, { useState, useEffect } from "react";
import axios from "axios";

const StationSelection = ({ setStationId }) => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState();

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    const response = await axios.get(
      "https://605c94c36d85de00170da8b4.mockapi.io/stations"
    );
    setStations(response.data);
  };

  const handleStationSelect = (event) => {
    setStationId(event.target.value);
    setSelectedStation(event.target.value);
  };

  return (
    <div className="flex justify-center py-5 text-2xl bg-blue-800 ">
      <div className="text-gray-200 border-r-8 border-blue-800">Station : </div>
      <select
        className="text-center text-gray-100 bg-blue-700 rounded-md "
        value={selectedStation ? selectedStation.id : stations[0]?.id}
        onChange={handleStationSelect}
      >
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
