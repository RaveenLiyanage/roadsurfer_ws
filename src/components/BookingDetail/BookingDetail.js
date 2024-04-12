import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useLocation, Link } from "react-router-dom";

function BookingDetail() {
  const location = useLocation();
  const data = location.state;
  const pickupReturnStationId = data.stationId;
  const customerName = data.customerName;
  const startDate = data.startDate;
  const endDate = data.endDate;
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    const response = await axios.get(
      `https://605c94c36d85de00170da8b4.mockapi.io/stations/${pickupReturnStationId}`
    );
    setDetails(response.data);
  };
  console.log(details);

  return (
    <div className="bg-gray-200 rounded-md">
      <div className="text-xl text-slate-950">
        Customer Name : {customerName}
      </div>
      <div className="text-xl text-slate-950">
        Start date : {moment(startDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
      </div>
      <div className="text-xl text-orange-700">
        End date : {moment(endDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
      </div>
      <div className="text-xl text-orange-700">
        Duration : {moment(endDate).diff(moment(startDate), "days")}
      </div>
      <div className="text-xl text-slate-950">
        Pickup Station : {details.name}
      </div>
      <div>
        <Link to="/roadsurfer_ws">Go Back to Bookings</Link>
      </div>
    </div>
  );
}

export default BookingDetail;
