import React, { useState, useEffect } from 'react';
import './Grid.css';

const rows = 15;
const cols = 20;

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Grid = () => {
  const [grid, setGrid] = useState([]);
  const [currentColumn, setCurrentColumn] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColor, setCurrentColor] = useState(getRandomColor());

  useEffect(() => {
    const initialGrid = Array(rows).fill().map(() => Array(cols).fill({ color: '#000' }));
    setGrid(initialGrid);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid(prevGrid => {
        const newGrid = prevGrid.map(row => row.map(cell => ({ color: cell.color })));
        if (currentRow > 0) {
          for (let i = 0; i < rows; i++) {
            newGrid[i][currentColumn] = { color: '#000' };
          }
        }
        if (currentRow < rows) {
          for (let i = 0; i < currentRow + 1; i++) {
            newGrid[i][currentColumn] = { color: currentColor };
          }
          setCurrentRow(currentRow + 1);
        } else {
          setCurrentColumn((currentColumn + 1) % cols);
          setCurrentRow(0);
          setCurrentColor(getRandomColor());
        }
        return newGrid;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentColumn, currentRow, currentColor]);

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="cell"
              style={{ backgroundColor: cell.color }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;