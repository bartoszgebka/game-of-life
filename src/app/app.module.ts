import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameOfLifeService } from './game-of-life.service';
import { GameControlsComponent } from './game-controls/game-controls.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, GameBoardComponent, GameControlsComponent],
  imports: [BrowserModule, FormsModule, NgbModule],
  providers: [GameOfLifeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
