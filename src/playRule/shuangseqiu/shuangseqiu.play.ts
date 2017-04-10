import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { BallService } from '../../service/ball.service';
@Component({
  selector: 'shuangseqiu',
  templateUrl: './shuangseqiu.play.html'
})
export class shuangseqiuComponent implements OnInit {
  private ballArray: string[];
  @Output() private outer = new EventEmitter<any>();
  constructor(
    private ball: BallService) { }
  ngOnInit() {
    this.setball();
  }
  setball(): void {
    this.ballArray = this.ball.creatBalls({ red: 33, blue: 12 });
    this.outer.emit(this.ballArray);
  }
  reset() {
    this.setball();
  }
}
