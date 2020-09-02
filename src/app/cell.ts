export class Cell {
  private _col: number;
  private _row: number;
  private _currentState: boolean = false;

  constructor(col: number, row: number, state: boolean) {
    this._col = col;
    this._row = row;
    this._currentState = state;
  }

  get col(): number {
    return this._col;
  }

  get row(): number {
    return this._row;
  }

  isAlive(): boolean {
    return this._currentState;
  }

  set state(value: boolean) {
    this._currentState = value;
  }
}
