import React from 'react';
import { render, screen } from '@testing-library/react';
import StationSelection from './StationSelection';

// Mock data for stations
const mockStations = [
  { id: 1, name: 'Station A' },
  { id: 2, name: 'Station B' },
];

test('renders station selection dropdown', () => {
  render(<StationSelection stations={mockStations} />);
  const dropdown = screen.getByRole('combobox');
  expect(dropdown).toBeInTheDocument();
});

test('shows station names in dropdown', () => {
  render(<StationSelection stations={mockStations} />);
  const options = screen.getAllByRole('option');
  expect(options.length).toBe(2);
  expect(options[0].textContent).toBe('Station A');
  expect(options[1].textContent).toBe('Station B');
});
