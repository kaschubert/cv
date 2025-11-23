import './TicTacToe.css';

import { useState } from 'react';

function Square({
  value,
  onSquareClick,
  index = 0,
  winner = null
}: { 
  value: string,
  onSquareClick: () => void,
  index?: number,
  winner?: Winner | null
}) {

  let className = "square";
  if (winner && winner.winner_squares.includes(index)) {
    className += " square-winning";
  }

  return (
    <button
      onClick={onSquareClick}
      className={className}
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
    status_text = "Winner: " + winner.name;
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

  //more elegant than double for loop
  let squareItems = squares.map((value, index) => (
    <Square
      key={index}
      value={value}
      index={index}
      winner={winner}
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
  const [invertMoves, setInvertMoves] = useState(false);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares: Array<string>) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jump_to(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function invert_moves() {
    console.log("invert moves now ", !invertMoves);
    setInvertMoves(!invertMoves);
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
          onClick={() => jump_to(move)}
          disabled={move === currentMove}
          className={"move"}
        >
          {description}
        </button>
      </li>
    )

    return jsx;
  });

  if (invertMoves) {
    moves.reverse()
  }

  return (
    <div className="text-white flex columns-2 gap-4">
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="space-y-4">
        <button
          onClick={() => invert_moves()}
          className={"move"}
        >
          Invert moves
        </button>
        <ol className="space-y-1">
          {
            moves
          }
        </ol>
      </div>
    </div>
  );
}

interface Winner {
  name: string;
  winner_squares: [number, number, number];
}

function calculateWinner(squares: Array<string>) : Winner | null {
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
      const winner: Winner = {
        name: squares[a],
        winner_squares: [a, b, c]
      };
      return winner;
    }
  }
  return null;
}

export default Game;