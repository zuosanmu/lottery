import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { BallService } from '../../service/ball.service';
@Component({
  selector: 'qilecai',
  templateUrl: './qilecai.play.html'
})
export class qilecaiComponent implements OnInit {
  private ballArray: string[];
  @Output() private outerqilecai = new EventEmitter<any>();
  constructor(
    private ball: BallService) { }
  ngOnInit() {
    this.setball();
  }
  setball(): void {
    this.ballArray = this.ball.creatBalls({ red: 33, blue: 12 });
    this.outerqilecai.emit(this.ballArray);
  }
  reset() {
    this.setball();
  }
}
