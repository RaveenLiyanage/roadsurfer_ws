import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";

function Booking({ week, stationId }) {
  const [bookings, setBookings] = useState([]);
  const datesWithIds = [];
  const dates = [];

  useEffect(() => {
    fetchBookings(stationId);
  }, [week, stationId]);

  async function fetchBookings(stationId) {
    const url = `https://605c94c36d85de00170da8b4.mockapi.io/stations/${stationId}/bookings`;
    const response = await axios.get(url);
    setBookings(response.data);
  }
  
  bookings.map((booking) => dates.push(new Date(booking.startDate)));
  datesWithIds.map((booking) => dates.push({id:booking.id, startDate: new Date(booking.startDate)}));

  const startDate = new Date(Math.min.apply(null, dates));
  const calendarStartingDate = moment(startDate).subtract(
    startDate.getDay(),
    "days"
  );

  const renderWeekGrid = (day) => {
    const daysBookings = []
    const currentDay = new Date(moment(calendarStartingDate).add((7*(week-1)+day), 'days'));
    const bookingsForDay = bookings.filter(booking => moment(new Date(booking.startDate)).diff(currentDay, 'days') === 0);
    console.log(bookingsForDay)
      daysBookings.push(
        <div >
          {bookingsForDay.map((booking) => (
            <div> 
              <div >
                <Link to='/roadsurfer_ws/booking' state={{stationId:booking.pickupReturnStationId, bookingId:booking.id}}>{booking.customerName}</Link>
              </div>
            </div>
          ))}
        </div>
      );
      return daysBookings;
    }

  return (
    <div>
      <div>
        <div className="flex justify-around grid-cols-7 day" key="day-title">
          {moment.weekdaysShort().map((day,i) => (
            <div className="flex flex-col">
              <span key={day}>{day}</span>
               {renderWeekGrid(i)} 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Booking;
