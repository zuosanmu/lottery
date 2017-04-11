import { Component, Output, EventEmitter, OnInit } from '@angular/core';
@Component({
  selector: 'guaguale-participants',
  templateUrl: './guaguale-participants.html'
})
export class guagualeParticipantsComponent implements OnInit {
  private count: number = 2;
  private isTwo: boolean = false;
  private isThree: boolean = true;
  private isFive: boolean = true;
  private isTen: boolean = true;
  private isTwenty: boolean = true;
  private isThirty: boolean = true;
  constructor() {
  }
  @Output() private guagualeParticipants = new EventEmitter<number>();
  setcount(sum) {
    this.isTwo = this.isThree = this.isFive = this.isTen = this.isTwenty = this.isThirty = true;
    switch (sum) {
      case 2:
        this.isTwo = false;
        break;
      case 3:
        this.isThree = false;
        break;
      case 5:
        this.isFive = false;
        break;
      case 10:
        this.isTen = false;
        break;
      case 20:
        this.isTwenty = false;
        break;
      case 30:
        this.isThirty = false;
        break;
    }
    this.count = sum;
  }
  ngOnInit() {
    this.sendCount();
  }
  sendCount() {
    this.guagualeParticipants.emit(this.count);
  }

}