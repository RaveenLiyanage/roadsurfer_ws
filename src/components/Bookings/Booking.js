import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";

function Booking({ week, stationId }) {
  const [bookings, setBookings] = useState([]); //store fetched booking details
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
  datesWithIds.map((booking) =>
    dates.push({ id: booking.id, startDate: new Date(booking.startDate) })
  );

  const startDate = new Date(Math.min.apply(null, dates));
  const calendarStartingDate = moment(startDate).subtract(
    startDate.getDay(),
    "days"
  );

  const weekStartDate = moment(calendarStartingDate).add(((week-1)*7), 'days').format('dddd DD/MM/YYYY')
  const weekEndDate = moment(calendarStartingDate).add(((week-1)*7+6), 'days').format('dddd DD/MM/YYYY')

  const renderWeekGrid = (day) => {
    const daysBookings = [];
    const currentDay = new Date(
      moment(calendarStartingDate).add(7 * (week - 1) + day, "days")
    );
    const bookingsForDay = bookings.filter(
      (booking) =>
        moment(new Date(booking.startDate)).diff(currentDay, "days") === 0
    );
    daysBookings.push(
      <div>
        {bookingsForDay.map((booking) => (
          <div className="p-2 bg-yellow-300 border-8 rounded-md">
            <Link
              className="flex flex-col"
              to="/roadsurfer_ws/booking"
              state={{
                stationId: booking.pickupReturnStationId,
                bookingId: booking.id,
              }}
            >
              <span>{booking.customerName}</span>
              <span>{moment(booking.startDate).format("YYYY/MM/DD")}</span>
            </Link>
          </div>
        ))}
      </div>
    );
    return daysBookings;
  };

  return (
    <div>
      <div className="text-center">Week form {weekStartDate} to {weekEndDate}</div>
      <div
        className="flex justify-around grid-cols-7 border-t-8 bg-slate-300 day"
        key="day-title"
      >
        {moment.weekdays().map((day, i) => (
          <div className="flex flex-col">
            <span
              className="p-4 text-xl font-semibold bg-orange-300 rounded-md"
              key={day}
            >
              {day}
            </span>
            {renderWeekGrid(i)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Booking;
