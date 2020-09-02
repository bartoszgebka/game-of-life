import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameOfLifeService } from '../game-of-life.service';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
})
export class GameControlsComponent implements OnInit, OnDestroy {
  running: boolean;
  private interval: number;
  constructor(public gameOfLifeService: GameOfLifeService) {}

  ngOnInit(): void {
    this.start();
  }

  start(): void {
    if (!this.running) {
      this.running = true;
      this.interval = setInterval(() => {
        this.gameOfLifeService.nextCycle();
      }, this.gameOfLifeService.speed);
    }
  }

  pause(): void {
    clearInterval(this.interval);
    this.running = false;
  }

  reset(): void {
    this.pause();
    this.gameOfLifeService.reset();
  }

  resize(): void {
    this.gameOfLifeService.onResizeClick();
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
