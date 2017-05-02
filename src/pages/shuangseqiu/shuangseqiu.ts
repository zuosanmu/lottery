import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BallService } from '../../service/ball.service';
import { LotteryService } from '../../service/lottery.service';
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
  private count: number = 1;
  private acount: number;
  private multiple: number = 1;
  private superadditionArray = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ball: BallService,
    public alertCtrl: AlertController,
    public lotteryService: LotteryService) {
    this.lottery = this.navParams.get('page');
  }
  superaddition() {
    this.superadditionArray.push(this.ball.creatBalls({ red: 33, blue: 16 }));
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShuangseqiuPage');
  }
  pay() {
    this.acount = (this.superadditionArray.length + 1) * this.multiple * 2
    if (this.acount * 2 > this.lottery.purchase_cut_off_time) {
      this.presentConfirm_no();
    } else {
      this.bet();
    }

  }
  bet() {
    this.lotteryService.getPost({
      "req": "envelope_bet",
      "content": {
        'lottery_type': '_ssq',                              //彩种类型
        'issue_no': this.lottery.issue_no,                                       //期号
        'bet_count': this.multiple,                                     //投注倍数 默认1
        'follow_issue': 1,                                 //是否追期 默认1不追期
        'balance': this.lottery.user_now_balance,                                        //用户余额
        'total_bet_amount': this.acount,                        //投注总额
        'need_person': this.count,
        'bet_items': [{
          'play_type': '_01',                      //玩法
          'bet_item':'07,08,10,14,20,30#06',                     //投注项
          'bet_type': '_01',                       //投注类型
          'bet_amount': 2,                       //投注金额
         }]                              //所需人数
      }
    }
      )
     .subscribe(_order => {
        if (JSON.parse(_order['_body']).ret[0] == 'ok') {
          this.lottery.user_now_balance = this.lottery.user_now_balance - this.acount;
        }
        this.shareHall(JSON.parse(_order['_body']).content.order_no);
        // this.presentAlert(JSON.parse(_order['_body']).content.order_no);
      }
      );
  }
  shareHall(msg: string) {
    this.lotteryService.getPost({
      "req": "share_hall",
      "content": {
        'order_no': msg,
      }
    })
      .subscribe(data => {
        this.presentConfirm();
      }
      );
  }
  presentAlert(msg: string) {
    let alert = this.alertCtrl.create({
      title: '提示信息',
      subTitle: "订单号:"+msg,
      buttons: [ {
          text: '确定',
          handler: () => {
            this.navCtrl.popToRoot();
          }
        }]
    });
    alert.present();
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: '支付成功',
      message: '你已经成功支付！！是否分享红包到大厅',
      buttons: [
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
  presentConfirm_no() {
    let alert = this.alertCtrl.create({
      title: '支付失败',
      message: '你的余额不足，请充值',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '充值',
          handler: () => {
            this.lotteryService.getPost({
              "req": "quick_pay",
              "content": {
                "amount": this.acount,
                "payPlatform": 'heepay'
              }
            }
             )
              .subscribe(html => {

              }
              );
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
