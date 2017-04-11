import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { BallService } from '../../service/ball.service';
@Component({
  selector: 'pailie5',
  templateUrl: './pailie5.play.html'
})
export class pailie5Component implements OnInit {
  private ballArray: string[];
  @Output() private outerpailie5 = new EventEmitter<any>();
  constructor(
    private ball: BallService) { }
  ngOnInit() {
    this.setball();
  }
  setball(): void {
    this.ballArray = this.ball.creatBalls({ red: 33, blue: 12 });
    this.outerpailie5.emit(this.ballArray);
  }
  reset() {
    this.setball();
  }
}
