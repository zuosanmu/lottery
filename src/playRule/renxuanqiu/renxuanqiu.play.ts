import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { BallService } from '../../service/ball.service';
@Component({
  selector: 'renxuanqiu',
  templateUrl: './renxuanqiu.play.html'
})
export class renxuanqiuComponent implements OnInit {
  private ballArray: string[];
  @Output() private outerrenxuanqiu = new EventEmitter<any>();
  constructor(
    private ball: BallService) { }
  ngOnInit() {
    this.setball();
  }
  setball(): void {
    this.ballArray = this.ball.creatBalls({ red: 33, blue: 12 });
    this.outerrenxuanqiu.emit(this.ballArray);
  }
  reset() {
    this.setball();
  }
}
