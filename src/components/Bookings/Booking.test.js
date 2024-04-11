import React from 'react';
import { render, screen } from '@testing-library/react';
import Booking from './Booking';

const mockBookings = [
  {
    id: 1,
    customerName: 'John Doe',
    startDate: '2024-04-15',
    endDate: '2024-04-17',
    pickupReturnStationId: 2,
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    startDate: '2024-04-17',
    endDate: '2024-04-20',
    pickupReturnStationId: 2,
  },
];

test('renders week header with correct dates', () => {
  const week = 2; // Simulate week number
  const stationId = 1; // Simulate station ID

  render(<Booking week={week} stationId={stationId} bookings={mockBookings} />);

  const weekHeader = screen.getByText(/Week from .* to .*$/i);
  expect(weekHeader).toBeInTheDocument();

  // Test specific dates based on your logic for calculating week start and end
  const expectedStartDate = 'Monday 08/04/2024'; // Adjust based on your calculations
  const expectedEndDate = 'Sunday 14/04/2024'; // Adjust based on your calculations

  expect(weekHeader.textContent).toContain(expectedStartDate);
  expect(weekHeader.textContent).toContain(expectedEndDate);
});

test('renders day labels and bookings for the week', () => {
  const week = 2; // Simulate week number
  const stationId = 1; // Simulate station ID

  render(<Booking week={week} stationId={stationId} bookings={mockBookings} />);

  const dayLabels = screen.getAllByText(moment.weekdaysShort().map((day) => new RegExp(day, 'i')));
  expect(dayLabels.length).toBe(7);

  const bookings = screen.getAllByText(/John Doe|Jane Smith/i);
  expect(bookings.length).toBe(2);
});

test('renders booking details with link', () => {
  const week = 2; // Simulate week number
  const stationId = 1; // Simulate station ID

  render(<Booking week={week} stationId={stationId} bookings={mockBookings} />);

  const bookingLink = screen.getByRole('link', { name: /John Doe/i });
  expect(bookingLink).toBeInTheDocument();

  // Test link properties (URL, state) based on your implementation
  expect(bookingLink).toHaveAttribute('href', '/roadsurfer_ws/booking');
  expect(bookingLink).toHaveState({ stationId: 2, bookingId: 1 }); // Adjust based on your state passing
});
