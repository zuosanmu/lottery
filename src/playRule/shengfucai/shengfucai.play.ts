import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { BallService } from '../../service/ball.service';
@Component({
  selector: 'shengfucai',
  templateUrl: './shengfucai.play.html'
})
export class shengfucaiComponent implements OnInit {
  private ballArray: string[];
  @Output() private outershengfucai = new EventEmitter<any>();
  constructor(
    private ball: BallService) { }
  ngOnInit() {
    this.setball();
  }
  setball(): void {
    this.ballArray = this.ball.creatBalls({ red: 33, blue: 12 });
    this.outershengfucai.emit(this.ballArray);
  }
  reset() {
    this.setball();
  }
}
