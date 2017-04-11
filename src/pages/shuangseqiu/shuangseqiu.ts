import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BallService } from '../../service/ball.service';
/*
  Generated class for the Shuangseqiu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shuangseqiu',
  templateUrl: 'shuangseqiu.html'
})
export class ShuangseqiuPage {
  private lottery;
  private count;
  private multiple:number=1;
  private balance:string='100.00';
  private superadditionArray = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ball: BallService) {
    this.lottery = this.navParams.get('page');
  }
  superaddition() {
    this.superadditionArray.push(this.ball.creatBalls({ red: 33, blue: 16 }));
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShuangseqiuPage');
  }
  receiveCount(msg: number) {
    this.count = msg;
  }
}
