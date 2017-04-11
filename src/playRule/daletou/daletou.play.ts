import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { BallService } from '../../service/ball.service';
@Component({
  selector: 'daletou',
  templateUrl: './daletou.play.html'
})
export class daletouComponent implements OnInit {
  private ballArray: string[];
  @Output() private outerdaletou = new EventEmitter<any>();
  constructor(
    private ball: BallService) { }
  ngOnInit() {
    this.setball();
  }
  setball(): void {
    this.ballArray = this.ball.creatBalls({ red: 35, blue: 12 });
    this.outerdaletou.emit(this.ballArray);
  }
  reset() {
    this.setball();
  }
}
