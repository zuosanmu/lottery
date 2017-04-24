import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

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
    public navParams: NavParams,
    public alertCtrl: AlertController) {
    this.lottery = this.navParams.get('page');
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
