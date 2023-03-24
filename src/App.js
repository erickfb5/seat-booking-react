import React, { useState, useEffect } from 'react';
import {movies} from './movies';
import './App.css';

function App() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(localStorage.getItem('selectedMovieIndex') || 0);
  const [selectedMoviePrice, setSelectedMoviePrice] = useState(localStorage.getItem('selectedMoviePrice') || 10);

  useEffect(() => {
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  useEffect(() => {
    localStorage.setItem('selectedMovieIndex', selectedMovieIndex);
    localStorage.setItem('selectedMoviePrice', selectedMoviePrice);
  }, [selectedMovieIndex, selectedMoviePrice]);

  const handleSeatClick = (index) => {
    const seatIndex = selectedSeats.indexOf(index);

    if (seatIndex > -1) {
      setSelectedSeats([...selectedSeats.slice(0, seatIndex), ...selectedSeats.slice(seatIndex + 1)]);
    } else {
      setSelectedSeats([...selectedSeats, index]);
    }
  };

  const handleMovieChange = (e) => {
    setSelectedMovieIndex(e.target.selectedIndex);
    setSelectedMoviePrice(e.target.value);
  };

  return (
    <div className="App">
      <div className="movie-container">
        <label>Pick a movie</label>
        <select value={selectedMoviePrice} onChange={handleMovieChange}>
          {movies.map((movie, index) => (
            <option key={index} value={movie.price}>
              {movie.name} (${movie.price})
            </option>
          ))}
        </select>
      </div>

      <ul className="showcase">
        <li>
          <div className="seat"></div>
          <small>N/A</small>
        </li>
        <li>
          <div className="seat selected"></div>
          <small>Selected</small>
        </li>
        <li>
          <div className="seat occupied"></div>
          <small>Occupied</small>
        </li>
      </ul>

      <div className="container">
        <div className="screen"></div>

        {movies[selectedMovieIndex].seats.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((seat, seatIndex) => (
              <div
                className={`seat ${seat ? '' : 'occupied'} ${selectedSeats.includes(rowIndex * row.length + seatIndex) ? 'selected' : ''}`}
                key={seatIndex}
                onClick={() => handleSeatClick(rowIndex * row.length + seatIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>

      <p className="text">
        You have selected <span id="count">{selectedSeats.length}</span> seats for a price of $<span id="total">{selectedSeats.length * selectedMoviePrice}</span>
      </p>

      <button type="reset" onClick={() => setSelectedSeats([])}>Reset</button>
    </div>
  );
}

export default App;
