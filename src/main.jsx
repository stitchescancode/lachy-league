import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router
import Screen from './Screen.jsx';
import TimeUntilNextBroadcast from './graphics/TimeUntilNextBroadcast.jsx';  // Example of another component to route to

// Import your global CSS styles
import './App.css';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<Screen />} />
      <Route path="/until" element={<TimeUntilNextBroadcast />} />
    </Routes>
  </Router>
);