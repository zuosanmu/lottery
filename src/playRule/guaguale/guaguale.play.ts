import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { BallService } from '../../service/ball.service';
@Component({
  selector: 'guaguale',
  templateUrl: './guaguale.play.html'
})
export class guagualeComponent implements OnInit {
  private ballArray: string[];
  @Output() private outerguaguale = new EventEmitter<any>();
  constructor(
    private ball: BallService) { }
  ngOnInit() {
    this.setball();
  }
  setball(): void {
    this.ballArray = this.ball.creatBalls({ red: 33, blue: 12 });
    this.outerguaguale.emit(this.ballArray);
  }
  reset() {
    this.setball();
  }
}
