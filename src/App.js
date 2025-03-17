
import './App.css';
import React, { useState, useEffect, useCallback } from "react";
function App() {
    const [points, setPoints] = useState(1); // Giá trị mặc định
    const [numbers, setNumbers] = useState([]);
    const [nextNumber, setNextNumber] = useState(1);
    const [message, setMessage] = useState("LET'S PLAY");
    const [time, setTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [title, setTitle] = useState("");
    const [selectedNumber, setSelectedNumber] = useState(null);

    const [isAutoPlaying, setIsAutoPlaying] = useState(false);

    useEffect(() => {
      let timer;
      if (isPlaying) {
        timer = setInterval(() => {
          setTime((prev) => prev + 0.1);
        }, 100);
      }
      return () => clearInterval(timer);
    }, [isPlaying]);


    const playGame = () => {
      if (points < 1) {
        return;
      }
      // const shuffledNumbers = Array.from({ length: points }, (_, i) => i + 1).sort(
      //   () => Math.random() - 0.5
      // );

      const shuffledNumbers = Array.from({ length: points }, (_, i) => ({
        value: i + 1,
        x: Math.random() * 90, // Random x position (percentage)
        y: Math.random() * 90, // Random y position (percentage)
      })).sort(() => Math.random() - 0.5);

      setNumbers(shuffledNumbers);
      setNextNumber(1);
      setMessage("LET'S PLAY");
      setTime(0);
      setIsPlaying(true);
      setTitle("");
      setSelectedNumber(null);
      setIsAutoPlaying(false);
    };

    //Random vị trí của các số

    const resetGame = () => {
      if (points < 1) {
        return;
      }
      // const shuffledNumbers = Array.from({ length: points }, (_, i) => i + 1).sort(
      //   () => Math.random() - 0.5
      // );

      const shuffledNumbers = Array.from({ length: points }, (_, i) => ({
        value: i + 1,
        x: Math.random() * 90, // Random x position (percentage)
        y: Math.random() * 90, // Random y position (percentage)
      })).sort(() => Math.random() - 0.5);
      setNumbers(shuffledNumbers);
      setNextNumber(1);
      setMessage("LET'S PLAY");
      setTime(0);
      setIsPlaying(true);
      setTitle("");
      setSelectedNumber(null);
      setIsAutoPlaying(false);
    };

    

    // Khi người dùng click vào số
    const handleClick = useCallback((num) => {
      if (num === nextNumber) {
        setSelectedNumber(num);
        
        setTimeout(() => {
          setNumbers((prev) => {
            const updatedNumber = prev.filter((n) => n.value !== num);
            if (updatedNumber.length === 0) {
                setMessage("ALL CLEARED!");
                setTitle("green");
                setIsPlaying(false);
            }
            return updatedNumber;
          });
        }, 1000);

        
        setNextNumber(nextNumber + 1);
      } else {
        setMessage("GAME OVER!");
        setTitle("red");
        setIsPlaying(false);
      }
    }, [nextNumber]);

    // Auto Play On
    useEffect(() => {
      if (!isAutoPlaying) return;
    
      let interval = setInterval(() => {
        if (numbers.length === 0) {
          clearInterval(interval);
          setIsAutoPlaying(false);
          return;
        }
    
        const nextNum = nextNumber;
        if (numbers.find((item) => item.value === nextNum)) {
          handleClick(nextNum);
        }
      }, 1000);
    
      return () => clearInterval(interval);
    }, [isAutoPlaying, nextNumber, numbers, handleClick]); // 🛠 Thêm handleClick vào đây
    
    
    const autoPlayOn = () => {
      setIsAutoPlaying(true);
    };
    

    const autoPlayOff = () => {
      setIsAutoPlaying(false);
    }
    
    
  return (
    <div className="game-container">
      <div className="game-content flex-col">
        <h2  className={`title-game ${title === "" ? "" : (title === "green" ? "green" : "red")}`}>{message}</h2>
        <div className="points-box flex-row">
          <p>Points:</p>
          <input  type="number" 
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
          />
        </div>
        <div className="time-box flex-row">
          <p>Time:</p>
          <p>{time.toFixed(1)} s</p>
        </div>
          {!isPlaying ? (
            <div className="btn-box flex-row">
              <button className="btn btn-play" onClick={playGame}>Play</button>
            </div>
          ) : (
            <div className="btn-box flex-row">
              <button className="btn btn-restart" onClick={resetGame}>Restart</button>
              {!isAutoPlaying ? (
                <button className="btn btn-autoPlay" onClick={autoPlayOn}>Auto Play On</button>
              ):(
                <button className="btn btn-autoPlay" onClick={autoPlayOff}>Auto Play Off</button>
              )}
            </div>
          )}

        <div className="game-board">
          {numbers.map((num) => (
            <button
              className={`btn-circle  ${selectedNumber === num.value ? "active fade-out" : ""}`}
              key={num.value}
              onClick={() => handleClick(num.value)}
              style={{ top: `${num.y}%`, left: `${num.x}%`, zIndex: 100 - num.value }}
              
            >
              {num.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
