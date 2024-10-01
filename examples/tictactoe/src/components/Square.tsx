import React from 'react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  const displayValue = value === 'X' ? 'X' : value === 'O' ? 'O' : '';
  return (
    <button className="square" onClick={onClick}>
      {displayValue}
    </button>
  );
};

export default Square;