import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./App.css";

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board() {
  const [playcount, setPlaycount] = useState(() => {
    const initialCount = localStorage.getItem("playcount");
    return initialCount ? parseInt(initialCount) : 1;
  });
  const [restart, setRestart] = useState(false);
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const calculateWinner = (squares) => {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const hasNullValues = (arr) => {
    return arr.some((val) => val === null);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (!hasNullValues(squares)) {
    status = "Match Tie";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setPlaycount((prev) => prev + 1);
  };

  useEffect(() => {
    localStorage.setItem("playcount", playcount);
  }, [playcount]);

  useEffect(() => {
    if (!hasNullValues(squares)) {
      setRestart(true);
    }
  }, [squares]);

  return (
    <div
      className="App"
      style={{ marginLeft: "auto", marginRight: "auto", padding: "50px" }}
    >
      <h1 style={{ marginBottom: "10px" }}>Tic Tac To Game</h1>
      <div className="status">{status}</div>
      {(calculateWinner(squares) || restart) && (
        <>
          <Confetti
            width={window.innerWidth || 300}
            height={window.innerWidth || 300}
          />
          <button onClick={restartGame} style={{ marginBottom: "10px" }}>
            Restart the Game
          </button>
        </>
      )}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>

      <div className="footer">
        <p>
          Play Count : {playcount} | Source Code :{" "}
          <a href="https://github.com/1983shiv/tik-tac-to-react">Github</a>
        </p>
      </div>
    </div>
  );
}

export default Board;
