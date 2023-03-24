import { useState, useEffect } from "react";
import "./App.css";
import { movies } from "./movies";

function App() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(0);
  const [seatCount, setSeatCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const selectedSeatsData = JSON.parse(localStorage.getItem("selectedSeats"));
    const selectedMovieData = JSON.parse(localStorage.getItem("selectedMovie"));
    if (selectedSeatsData) {
      setSelectedSeats(selectedSeatsData);
    }
    if (selectedMovieData) {
      setSelectedMovie(selectedMovieData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));
    setSeatCount(selectedSeats.length);
    setTotalPrice(selectedSeats.length * movies[selectedMovie].price);
  }, [selectedSeats, selectedMovie]);

  const handleSeatClick = (index) => {
    if (selectedSeats.includes(index)) {
      setSelectedSeats(
        selectedSeats.filter((seatIndex) => seatIndex !== index)
      );
    } else {
      setSelectedSeats([...selectedSeats, index]);
    }
  };

  const handleMovieSelect = (e) => {
    setSelectedMovie(e.target.value);
  };

  const handleResetClick = () => {
    setSelectedSeats([]);
    setSelectedMovie(0);
  };

  return (
    <div className="app">
      <div className="movie-container">
        <label>Pick a movie</label>
        <select id="movie" value={selectedMovie} onChange={handleMovieSelect}>
          {movies.map((movie, index) => (
            <option key={index} value={index}>
              {movie.title} (${movie.price})
            </option>
          ))}
        </select>
      </div>

      <div className="showcase">
        <div className="seat"></div>
        <small>N/A</small>

        <div className="seat selected"></div>
        <small>Selected</small>

        <div className="seat occupied"></div>
        <small>Occupied</small>
      </div>

      <div className="container">
        <div className="screen"></div>
        {movies[selectedMovie].seats.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((seat, seatIndex) => (
              <div
                key={seatIndex}
                className={`seat ${
                  seat === "0" ? "" : seat === "1" ? "selected" : "occupied"
                }`}
                onClick={() =>
                  handleSeatClick(rowIndex * row.length + seatIndex)
                }
              ></div>
            ))}
          </div>
        ))}
      </div>

      <p className="text">
        You have selected <span id="count">{seatCount}</span> seats for a price
        of $<span id="total">{totalPrice}</span>
      </p>

      <button type="reset" id="button" onClick={handleResetClick}>
        Reset
      </button>
    </div>
  );
}

export default App;
