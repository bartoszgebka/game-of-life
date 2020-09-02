import {
  Component,
  AfterViewInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GameOfLifeService } from './game-of-life.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  cols = 10;
  rows = 10;
  speed = 100;
  startClick = false;

  @ViewChild('content')
  modalContent: TemplateRef<any>;

  constructor(
    public modalService: NgbModal,
    private gameOfLifeService: GameOfLifeService
  ) {}

  ngAfterViewInit(): void {
    this.modalService.open(this.modalContent);
    this.gameOfLifeService.resizeClick.subscribe(() => {
      this.startClick = false;
      this.modalService.open(this.modalContent);
    });
  }

  start(): void {
    this.startClick = true;
    this.gameOfLifeService.initialize(this.cols, this.rows, this.speed);
  }
}
