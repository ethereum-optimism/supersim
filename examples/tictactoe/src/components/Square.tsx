import React, { useState } from 'react';

interface SquareProps {
  key: number;
}

const Square: React.FC<SquareProps> = () => {
  const [value, setValue] = useState<string>("X")
  const handleClick = async () => {
    const newVal = value == "X" ? "O" : "X"
    setValue(newVal)
  }

  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
};

export default Square;