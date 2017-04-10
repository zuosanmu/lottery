import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'shares',
  templateUrl: './shares.html'
})
export class sharesComponent implements OnInit {
  private count: number = 1;
  private isOne: boolean = false;
  private isFive: boolean = true;
  private isTen: boolean = true;
  private isOther: boolean = true;
  constructor(private alertCtrl: AlertController) {

  }
  @Output() private shares = new EventEmitter<number>();
  setcount(sum) {
    this.isOne = this.isFive = this.isTen = this.isOther = true;
    switch (sum) {
      case 1:
        this.isOne = false;
        break;
      case 5:
        this.isFive = false;
        break;
      case 10:
        this.isTen = false;
        break;

      default:
        this.isOther = false;
        break;
    }
    this.count = sum;
    console.log(this.count);
  }
  presentPrompt() {
    this.isOne = this.isFive = this.isTen = this.isOther = true;
    let alert = this.alertCtrl.create({
      title: '请输入你要分享的人数',
      inputs: [
        {
          name: 'acount',
          type: 'number',
          min: '1',
          max:'100',
          value: '2',
          placeholder: '请输入你要分享红包的人数'
        },
      ],
      buttons: [
        {
          text: '确定',
          handler: (sum) => { this.count = sum.acount; this.isOther = false; },
          role: 'cancel',
        }
      ]
    });
    alert.present();
  }
  ngOnInit() {
    this.sendCount();
  }
  sendCount() {
    this.shares.emit(this.count);
  }

}
