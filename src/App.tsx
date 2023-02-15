import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomeCard from './pages/home/components/home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import WeatherChk from './pages/home/components/weather';

function App() {
  return (
    <div className="App">
      <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={< HomeCard />}></Route>
          <Route path='/weather' element={< WeatherChk />}></Route>
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
