import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'xp-farm-TicTacToe';
  plays!: string[][][];
  currentPlayer!: Player;
  board!: Board[][];
  winner!: String;
/**
 * The play function takes a move object as a parameter, checks if the move is valid, and if it is, it
 * adds the move to the board, checks if the move is a winning move, and if it is, it returns true,
 * otherwise it switches the player and returns false
 * @param {Move} move - Move - this is the move that the player wants to make.
 * @returns A boolean value.
 */

  play(move: Move): boolean {
    /* This is checking if the move is valid. If the move is valid, then the board will be empty at
    that position. If the board is not empty at that position, then the move is not valid. */
    if (this.board[move.row][move.column]) {
      return false;
    } 
    this.board[move.row][move.column] = this.currentPlayer;
    /* This is a deep copy of the board. */
    this.plays.push(JSON.parse(JSON.stringify(this.board)));
    if (this.checkIfWinner(move)) {
      return true;
    }
    this.switchPlayer();
    return false;

  }

  /**
   * If there are no empty cells on the board, then the game is complete
   * @returns A boolean value.
   */
  gameIsComplete(): boolean {
    return !this.board.some((row) => row.some((cell) => !cell))
  }

  /**
   * If the current player is X, then change it to O, otherwise change it to X
   */
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  /**
   * Start the game
   */
  startGame() {
    /* init variables */
    this.plays = [];
    this.board = [
      ['','',''],
      ['','',''],
      ['','','']
    ];
    this.currentPlayer = 'X';
    this.winner = "";

    /* Generating random moves until the game is complete. */
    while (!this.gameIsComplete()) {
      const move: Move = {
        row: Math.floor(Math.random() * 3),
        column: Math.floor(Math.random() * 3)
      }
      if (this.play(move)) {
        this.winner = this.currentPlayer;
        break;
      }
    }
  }

  /**
   * If the current player has a row, column, or diagonal of all X's or O's, then the current player is
   * the winner
   * @param {Move} move - Move - the move that was just made
   * @returns A boolean value.
   */
  checkIfWinner(move: Move) {
    if (this.board[move.row].every((cell) => cell === this.currentPlayer) || this.board.every((row) => row[move.column] === this.currentPlayer)) {
      return true;
    }
    let isLeftRightDiagonalWinner = true;
    let isRightLeftDiagonalWinner = true;
    for (let idx1 = 0, idx2 = 2; idx1 < 3; idx1++, idx2--) {
      if (isLeftRightDiagonalWinner && this.board[idx1][idx1] !== this.currentPlayer) {
        isLeftRightDiagonalWinner = false;
      }
      if (isRightLeftDiagonalWinner && this.board[idx2][idx1] !== this.currentPlayer) {
        isRightLeftDiagonalWinner = false;
      }

      if (!isLeftRightDiagonalWinner && !isRightLeftDiagonalWinner) {
        break;
      }
    }
    
    return isLeftRightDiagonalWinner || isRightLeftDiagonalWinner;
  }


}

interface Move {
  row: number,
  column: number
}

type Board = '' | 'X' | 'O';

type Player = 'X' | 'O';