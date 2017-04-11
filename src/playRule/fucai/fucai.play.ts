import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { BallService } from '../../service/ball.service';
@Component({
  selector: 'fucai',
  templateUrl: './fucai.play.html'
})
export class fucaiComponent implements OnInit {
  private ballArray: string[];
  @Output() private outerfucai = new EventEmitter<any>();
  constructor(
    private ball: BallService) { }
  ngOnInit() {
    this.setball();
  }
  setball(): void {
    this.ballArray = this.ball.creatBalls({ red: 33, blue: 12 });
    this.outerfucai.emit(this.ballArray);
  }
  reset() {
    this.setball();
  }
}
