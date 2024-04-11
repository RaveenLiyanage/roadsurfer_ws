import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function BookingDetail() {
  const location = useLocation();
  const data = location.state;
  const pickupReturnStationId = data.stationId;
  const bookingId = data.bookingId;
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    const response = await axios.get(
      `https://605c94c36d85de00170da8b4.mockapi.io/stations/${pickupReturnStationId}/bookings/${bookingId}`
    );
    setDetails(response.data);
  };

  return (
    <div>
      <div>Customer Name</div>
      <div>{details.customerName}</div>
    </div>
  );
}

export default BookingDetail;
