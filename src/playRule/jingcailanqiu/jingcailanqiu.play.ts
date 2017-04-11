import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { BallService } from '../../service/ball.service';
@Component({
  selector: 'jingcailanqiu',
  templateUrl: './jingcailanqiu.play.html'
})
export class jingcailanqiuComponent implements OnInit {
  private ballArray: string[];
  @Output() private outerjingcailanqiu = new EventEmitter<any>();
  constructor(
    private ball: BallService) { }
  ngOnInit() {
    this.setball();
  }
  setball(): void {
    this.ballArray = this.ball.creatBalls({ red: 33, blue: 12 });
    this.outerjingcailanqiu.emit(this.ballArray);
  }
  reset() {
    this.setball();
  }
}
