import React from 'react';
import Square from './Square';

interface BoardProps {
  squares: (string | null)[];
  onClick: (i: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
  return (
    <div className="board">
      {[0, 1, 2].map((row) => (
        <div key={row} className="board-row">
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col;
            return (
              <Square
                key={index}
                value={squares[index]}
                onClick={() => onClick(index)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;