import React, { Component } from 'react';

class ChessBoard extends Component {

  renderSquare(row, col) {
    const isDark = (row + col) % 2 === 0;
    return (
      <div
        key={`${row}-${col}`}
        style={{
          width: '60px',
          height: '60px',
          backgroundColor: isDark ? '#B58863' : '#F0D9B5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          color: isDark ? 'white' : 'black',
        }}
      >
        {row === 0 && col === 0 && '♜'}
        {row === 0 && col === 1 && '♞'}
        {row === 0 && col === 2 && '♝'}
        {row === 0 && col === 3 && '♛'}
        {row === 0 && col === 4 && '♚'}
        {row === 0 && col === 5 && '♝'}
        {row === 0 && col === 6 && '♞'}
        {row === 0 && col === 7 && '♜'}
        {row === 1 && col === 0 && '♟'}
        {row === 1 && col === 1 && '♟'}
        {row === 1 && col === 2 && '♟'}
        {row === 1 && col === 3 && '♟'}
        {row === 1 && col === 4 && '♟'}
        {row === 1 && col === 5 && '♟'}
        {row === 1 && col === 6 && '♟'}
        {row === 1 && col === 7 && '♟'}
      </div>
    );
  }

  render() {
    const boardSize = 8;
    const board = [];
    for (let row = 0; row < boardSize; row++) {
      const squares = [];
      for (let col = 0; col < boardSize; col++) {
        squares.push(this.renderSquare(row, col));
      }
      board.push(
        <div key={row} style={{ display: 'flex' }}>
          {squares}
        </div>
      );
    }
    return <div style={{ display: 'inline-block', border: '1px solid black' }}>{board}</div>;
  }
}

export default ChessBoard;
