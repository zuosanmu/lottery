import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { BallService } from '../../service/ball.service';
@Component({
  selector: 'pailie3',
  templateUrl: './pailie3.play.html'
})
export class pailie3Component implements OnInit {
  private ballArray: string[];
  @Output() private outerpailie3 = new EventEmitter<any>();
  constructor(
    private ball: BallService) { }
  ngOnInit() {
    this.setball();
  }
  setball(): void {
    this.ballArray = this.ball.creatBalls({ red: 33, blue: 12 });
    this.outerpailie3.emit(this.ballArray);
  }
  reset() {
    this.setball();
  }
}
