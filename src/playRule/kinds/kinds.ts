import { Component, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'kinds',
  templateUrl: './kinds.html'
})
export class kindsComponent implements OnChanges {
  private clicked: boolean[];
  constructor(private alertCtrl: AlertController) {

  }
  @Input() private InputMsg;
  @Output() private kinds = new EventEmitter();
  setcount(obj, index) {
    this.clicked.fill(true);
    this.clicked[index] = false;
    this.sendCount(obj);
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (this.InputMsg) {
      this.clicked = new Array(this.InputMsg.length).fill(true);
      this.clicked[0] = false;
      this.sendCount(this.InputMsg[0]);
    }
  }
  sendCount(acount) {
    this.kinds.emit(acount);
  }

}
