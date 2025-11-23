import './TicTacToe.css';

import { useState } from 'react';

function Square({
  value,
  onSquareClick,
  isWinning = false
}: { 
  value: string,
  onSquareClick: () => void,
  isWinning?: boolean
}) {

  return (
    <button
      onClick={onSquareClick}
      className="square"
    >
      {value}
    </button>
  );
}

function Board(
  { xIsNext, squares, onPlay }
  :{ xIsNext: boolean, squares: Array<string>, onPlay: (nextSquares: Array<string>) => void }
){
  function handleClick(i: number) {
    console.log('click');

    if ( calculateWinner(squares) || squares[i] !== '' ) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status_text;
  if (winner) {
    status_text = "Winner: " + winner;
  } else {
    status_text = "Next player: " + (xIsNext ? "X" : "O");
  }

  // let squareItems = [];
  // const row_length = 3;
  // const row_count = 3;
  // for (let y = 0; y < row_length; y++) {
  //   for (let x = 0; x < row_count; x++) {
  //     let index = x+y*row_length;
  //     console.log(" index: ", index);
  //     squareItems.push(
  //       <Square
  //         key={index}
  //         value={squares[index]}
  //         onSquareClick={() => handleClick(index)} 
  //       />
  //     );
  //   }    
  // }

  let squareItems = squares.map((value, index) => (
    <Square
      key={index}
      value={value}
      onSquareClick={() => handleClick(index)}
    />
  ))

  let board_jsx = (
    <>
      <div>{status_text}</div>
      <div className="inline-grid border border-gray-500">
        <div className="square_grid">
          {
            squareItems
          }
        </div>
      </div>
    </>
  );

  return board_jsx;
}

function Game() {
  const [currentMove, setCurrentMove] = useState(0);
  const [history, setHistory] = useState(
    /*array of arrays for holding the board state before each game move*/
    [Array(9).fill('')]
  );
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares: Array<string>) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move: number) => {
    let description;
    if (move > 0) {
      if (move === currentMove) {
        description = 'You are at move #' + move;
      } else {
        description = 'Go to move #' + move;
      }
    } else {
      description = 'Go to game start';
    }

    let jsx = (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          disabled={move === currentMove}
          className={"move"}
        >
          {description}
        </button>
      </li>
    )

    return jsx;
  });

  return (
    <div className="text-black flex columns-2 gap-4">
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <ol className="space-y-1">
        {moves}
      </ol>
    </div>
  );
}

function calculateWinner(squares: Array<string>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;