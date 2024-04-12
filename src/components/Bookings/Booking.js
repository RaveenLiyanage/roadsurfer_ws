import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

function Booking({ stationId }) {
  const [bookings, setBookings] = useState([]); //store fetched booking details
  const [week, setWeek] = useState(1);
  const datesWithIds = [];
  const dates = [];

  useEffect(() => {
    fetchBookings(stationId);
  }, [stationId]); //whenever the week or the station is changed, respective booking details are being fetched

  async function fetchBookings(stationId) {
    const url = `https://605c94c36d85de00170da8b4.mockapi.io/stations/${stationId}/bookings`;
    const response = await axios.get(url);
    setBookings(response.data);
    setWeek(1); //when the station is changed, the schedule is displayed from the week of the earliest booking
  }

  bookings.map((booking) => dates.push(new Date(booking.startDate))); //getting the starting dates of bookings

  const startDate = new Date(Math.min.apply(null, dates)); //finding the earliest booking of the station
  const calendarStartingDate = moment(startDate).subtract(
    startDate.getDay(),
    "days"
  ); //finding the date of the sunday in the week which the earliest booking is placed

  //calculating the date of the starting date of the displayed week
  const weekStartDate = moment(calendarStartingDate)
    .add((week - 1) * 7, "days")
    .format("dddd DD/MM/YYYY");

  //calculating the date of the last date of the displayed week
  const weekEndDate = moment(calendarStartingDate)
    .add((week - 1) * 7 + 6, "days")
    .format("dddd DD/MM/YYYY");

  //finding whether there are any booking available for the day (this function is called in line 119 )
  const renderWeekGrid = (day) => {
    const daysBookings = [];
    const currentDay = new Date(
      moment(calendarStartingDate).add(7 * (week - 1) + day, "days")
    );
    console.log(moment(currentDay).format("DD/MM/YYYY"))
    const bookingsForDay = bookings.filter(
      (booking) =>
        moment(new Date(booking.startDate)).format('DD/MM/YYYY') == moment(currentDay).format("DD/MM/YYYY") //checking the starting day of the booking and the current day is same, if true the booking details should be displayed
    );
    //if there are bookings for the day, they are pushed in to an array to be displayed
    daysBookings.push(
      <div>
        {bookingsForDay.map((booking) => (
          <div className="p-2 bg-yellow-300 border-8 rounded-md">
            <Link
              className="flex flex-col"
              to="/roadsurfer_ws/booking"
              state={{
                stationId: booking.pickupReturnStationId,
                customerName: booking.customerName,
                startDate: booking.startDate,
                endDate: booking.endDate,
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

  //functions for handling previous and next buttons
  const handlePrevious = () => {
    week === 0 ? setWeek(week) : setWeek(week - 1);
  };

  const handleNext = () => {
    setWeek(week + 1);
  };

  return (
    <div>
      <div className="flex items-center justify-around">
        <button
          className="p-5 text-2xl bg-red-300 border-black border-solid rounded-md h-2/4"
          onClick={handlePrevious}
        >
          <AiFillCaretLeft />
        </button>
        <div className="items-center text-xl ">
          Week {week} form {weekStartDate} to {weekEndDate}
        </div>
        <button
          className="p-5 text-2xl bg-red-300 border-black border-solid rounded-md h-2/4"
          onClick={handleNext}
        >
          <AiFillCaretRight />
        </button>
      </div>
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
