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
    <div className="h-full bg-gray-200 border-8 rounded-md p-9">
      <div className="text-xl text-slate-950">
        Customer Name : {customerName}
      </div>
      <div className="text-xl text-slate-950">
        Start date : {moment(startDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
      </div>
      <div className="text-xl text-orange-700">
        End date : {moment(endDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
      </div>
      <div className="text-xl text-slate-950">
        Duration : {moment(endDate).diff(moment(startDate), "days")}
      </div>
      <div className="text-xl text-slate-950">
        Pickup Station : {details.name}
      </div>
      <button className="h-20 p-4 bg-blue-700 border-8 rounded-lg">
        <Link to="/roadsurfer_ws" state={{stationId: pickupReturnStationId}}>
          Go Back to Bookings
        </Link>
      </button>
    </div>
  );
}

export default BookingDetail;
