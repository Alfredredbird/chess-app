import React, { Component } from 'react';
import Cookies from 'js-cookie';

class ChessBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fen: '8/8/8/8/8/8/8/8 w - - 0 1', // default empty chess board
      theme: 'default', // default theme
    };
  }

  componentDidMount() {
    this.fetchRandomChessPuzzle();
  }

  fetchAuthTokenFromCookies() {
    return Cookies.get('authToken'); // Assuming 'authToken' is the name of the cookie
  }

  fetchRandomChessPuzzle() {
    const authToken = this.fetchAuthTokenFromCookies();

    const fetchPuzzle = (attemptsLeft) => {
      if (attemptsLeft <= 0) {
        console.error('Failed to fetch a valid chess puzzle after multiple attempts.');
        return;
      }

      fetch(`http://192.168.12.32:5000/api/verify_cookie`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ cookie: authToken }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            const username = data.user.user_name;
            this.fetchUserTheme(username);
          } else {
            console.error('Invalid cookie:', data.error);
          }
        })
        .catch((error) => {
          console.error('Error verifying cookie:', error);
        });

      const randomNumber = this.generateRandomNumber();
      fetch(`http://192.168.12.32:5000/api/chesspuzzle/random?number=${randomNumber}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.chess_puzzle) {
            this.setState({ fen: data.chess_puzzle.fen });
          } else {
            console.warn('Puzzle not found, retrying...');
            setTimeout(() => fetchPuzzle(attemptsLeft - 1), 1000); // Retry after 1 second
          }
        })
        .catch((error) => {
          console.error('Error fetching chess puzzle:', error);
          setTimeout(() => fetchPuzzle(attemptsLeft - 1), 1000); // Retry after 1 second
        });
    };

    this.generateRandomNumber = () => {
      return Math.floor(Math.random() * 10000); // Generate a random number
    };

    fetchPuzzle(5); // Try 5 times in total
  }

  fetchUserTheme(username) {
    fetch(`http://192.168.12.32:5000/api/member/${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          const theme = data.user.theme;
          this.setState({ theme: theme });
          this.renderBoardWithTheme(theme);
        } else {
          console.error('Theme not found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching user theme:', error);
      });
  }

  handleBoardClick = () => {
    const { fen } = this.state;
    const url = `http://192.168.12.185:3000/puzzle/${fen}`;
    window.location.href = url; // Redirect the user
  };

  renderSquare(row, col, piece) {
    if (piece === '0') return null; // Handle empty squares (number 0)

    const isDark = (row + col) % 2 === 0;

    let pieceUnicode = '';
    switch (piece) {
      case 'p':
        pieceUnicode = '\u265F';
        break; // Black pawn
      case 'P':
        pieceUnicode = '\u2659';
        break; // White pawn
      case 'r':
        pieceUnicode = '\u265C';
        break; // Black rook
      case 'R':
        pieceUnicode = '\u2656';
        break; // White rook
      case 'n':
        pieceUnicode = '\u265E';
        break; // Black knight
      case 'N':
        pieceUnicode = '\u2658';
        break; // White knight
      case 'b':
        pieceUnicode = '\u265D';
        break; // Black bishop
      case 'B':
        pieceUnicode = '\u2657';
        break; // White bishop
      case 'q':
        pieceUnicode = '\u265B';
        break; // Black queen
      case 'Q':
        pieceUnicode = '\u2655';
        break; // White queen
      case 'k':
        pieceUnicode = '\u265A';
        break; // Black king
      case 'K':
        pieceUnicode = '\u2654';
        break; // White king
      default:
        pieceUnicode = '';
        break;
    }

    let backgroundColor;
    if (this.state.theme === 'ice') {
      backgroundColor = isDark ? '#ADD8E6' : '#D6ECF3'; // Light blue for ice theme
    } else if (this.state.theme === 'fire') {
      backgroundColor = isDark ? '#E6B8AC' : '#E14E4E';
    } else if (this.state.theme === 'grass') {
      backgroundColor = isDark ? '#47C974' : '#B5DFB7';
    } else {
      backgroundColor = isDark ? '#B58863' : '#F0D9B5'; // Default checkered pattern
    }

    return (
      <div
        key={`${row}-${col}`}
        style={{
          width: '60px',
          height: '60px',
          backgroundColor: backgroundColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          color: isDark ? 'white' : 'black',
        }}
      >
        {pieceUnicode}
      </div>
    );
  }

  render() {
    const boardSize = 8;
    const board = [];
    const fenArray = this.state.fen.split(' ')[0].split('/');

    for (let row = 0; row < boardSize; row++) {
      const squares = [];
      for (let col = 0; col < boardSize; col++) {
        const piece = fenArray[row][col];
        squares.push(this.renderSquare(row, col, piece));
      }
      board.push(
        <div key={row} style={{ display: 'flex' }}>
          {squares}
        </div>
      );
    }
    return (
      <div
        onClick={this.handleBoardClick}
        style={{
          display: 'inline-block',
          border: '1px solid black',
          cursor: 'pointer',
        }}
      >
        {board}
      </div>
    );
  }
}

export default ChessBoard;
