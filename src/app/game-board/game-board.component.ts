import { Component, OnInit, Input } from '@angular/core';
import { GameOfLifeService } from '../game-of-life.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit {
  constructor(public gameOfLifeService: GameOfLifeService) {}

  ngOnInit(): void {}
}
