import React from 'react';
import Square from './Square';

const Board: React.FC = () => {
  return (
    <div className="board">
      {[0, 1, 2].map((row) => (
        <div key={row} className="board-row">
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col;
            return (
              <Square key={index} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;