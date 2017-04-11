import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { BallService } from '../../service/ball.service';
@Component({
  selector: 'dingguagua',
  templateUrl: './dingguagua.play.html'
})
export class dingguaguaComponent implements OnInit {
  private ballArray: string[];
  @Output() private outerdingguagua = new EventEmitter<any>();
  constructor(
    private ball: BallService) { }
  ngOnInit() {
    this.setball();
  }
  setball(): void {
    this.ballArray = this.ball.creatBalls({ red: 33, blue: 12 });
    this.outerdingguagua.emit(this.ballArray);
  }
  reset() {
    this.setball();
  }
}
