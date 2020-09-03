import { Injectable } from '@angular/core';
import { Cell } from './cell';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameOfLifeService {
  private _cols: number;
  private _rows: number;
  private _board: Cell[][];
  private _generation = 0;
  private _resizeClick: Subject<any> = new Subject<any>();
  private _speed: number;

  constructor() {}

  get board(): Cell[][] {
    return this._board;
  }

  get generation(): number {
    return this._generation;
  }

  public onResizeClick(): void {
    this.resizeClick.next();
  }

  get resizeClick(): Subject<any> {
    return this._resizeClick;
  }

  get speed(): number {
    return this._speed;
  }

  public initialize(cols: number, rows: number, speed: number): void {
    this._generation = 0;
    this._cols = cols;
    this._rows = rows;
    this._speed = speed;
    this._board = this.make2DArray();
    this.initializeBoard();
  }

  private make2DArray(): Cell[][] {
    const arr: Cell[][] = new Array(this._cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(this._rows);
    }

    return arr;
  }

  private initializeBoard(): void {
    for (let i = 0; i < this._cols; i++) {
      for (let j = 0; j < this._rows; j++) {
        const stateRandom: boolean = Math.random() >= 0.8;
        this._board[i][j] = new Cell(i, j, stateRandom);
      }
    }
  }

  public nextCycle(): void {
    for (let i = 0; i < this._cols; i++) {
      for (let j = 0; j < this._rows; j++) {
        const cell: Cell = this._board[i][j];
        const countN = this.getCountLiveNeighbourds(i, j);
        if (
          (!cell.isAlive() && countN === 3) ||
          (cell.isAlive() && (countN === 2 || countN === 3))
        ) {
          cell.state = true;
        } else {
          cell.state = false;
        }
      }
    }
    this._generation++;
  }

  public reset(): void {
    this._board = this.make2DArray();
    this.initializeBoard();
    this._generation = 0;
  }

  private getCountLiveNeighbourds(i: number, j: number): number {
    let sum = 0;
    if (this._board[i - 1]) {
      sum += this.getLiveNeighbor(this._board[i - 1][j - 1]);
      sum += this.getLiveNeighbor(this._board[i - 1][j + 1]);
      sum += this.getLiveNeighbor(this._board[i - 1][j]);
    }
    sum += this.getLiveNeighbor(this._board[i][j - 1]);
    sum += this.getLiveNeighbor(this._board[i][j + 1]);
    if (this.board[i + 1]) {
      sum += this.getLiveNeighbor(this._board[i + 1][j]);
      sum += this.getLiveNeighbor(this._board[i + 1][j - 1]);
      sum += this.getLiveNeighbor(this._board[i + 1][j + 1]);
    }
    return sum;
  }

  private getLiveNeighbor(cell: Cell): number {
    return cell ? (cell.isAlive() ? 1 : 0) : 0;
  }
}
