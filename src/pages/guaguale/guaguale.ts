import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Guaguale page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-guaguale',
  templateUrl: 'guaguale.html'
})
export class GuagualePage {
  private lottery;
  private count;
  private multiple: number = 1;
  private balance: string = '100.00';
  private classify:string ='中国红';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.lottery = this.navParams.get('page');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShuangseqiuPage');
  }
  receiveCount(msg: number) {
    this.count = msg;
  }
}
