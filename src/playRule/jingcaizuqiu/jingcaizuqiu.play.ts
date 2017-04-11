import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { BallService } from '../../service/ball.service';
@Component({
  selector: 'jingcaizuqiu',
  templateUrl: './jingcaizuqiu.play.html'
})
export class jingcaizuqiuComponent implements OnInit {
  private ballArray: string[];
  @Output() private outerjingcaizuqiu = new EventEmitter<any>();
  constructor(
    private ball: BallService) { }
  ngOnInit() {
    this.setball();
  }
  setball(): void {
    this.ballArray = this.ball.creatBalls({ red: 33, blue: 12 });
    this.outerjingcaizuqiu.emit(this.ballArray);
  }
  reset() {
    this.setball();
  }
}
