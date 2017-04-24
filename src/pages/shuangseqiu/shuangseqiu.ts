import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
  private multiple: number = 1;
  private balance: string = '100.00';
  private superadditionArray = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ball: BallService,
    public alertCtrl: AlertController) {
    this.lottery = this.navParams.get('page');
  }
  superaddition() {
    this.superadditionArray.push(this.ball.creatBalls({ red: 33, blue: 16 }));
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShuangseqiuPage');
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: '支付成功',
      message: '你已经成功支付！！是否参与抢红包',
      buttons: [
        {
          text: '继续购买',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    alert.present();
  }
  receiveCount(msg: number) {
    this.count = msg;
  }
}
