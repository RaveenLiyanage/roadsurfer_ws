import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import WeeklyView from './pages/WeeklyView';
import BookingDetail from './components/BookingDetail/BookingDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/roadsurfer_ws" element={<WeeklyView />}/>
        <Route path="/roadsurfer_ws/booking" element={<BookingDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
