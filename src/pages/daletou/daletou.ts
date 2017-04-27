import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BallService } from '../../service/ball.service';
/*
  Generated class for the Daletou page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-daletou',
  templateUrl: 'daletou.html'
})
export class DaletouPage {
  private lottery;
  private count;
  private superadditionArray = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ball: BallService,
    public alertCtrl: AlertController) {
    this.lottery = this.navParams.get('page');
  }
  superaddition() {
    this.superadditionArray.push(this.ball.creatBalls({ red: 35, blue: 12 }));
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
