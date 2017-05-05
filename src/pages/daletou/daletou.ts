import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BallService } from '../../service/ball.service';
import { LotteryService } from '../../service/lottery.service';
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
    this.superadditionArray.push(this.ball.creatBalls({ red: 35, blue: 12 }));
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
        'lottery_type': '_dlt',                              //彩种类型
        'issue_no': this.lottery.issue_no,                                       //期号
        'bet_count': this.multiple,                                     //投注倍数 默认1
        'follow_issue': 1,                                 //是否追期 默认1不追期
        'balance': this.lottery.user_now_balance,                                        //用户余额
        'total_bet_amount': this.acount,                        //投注总额
        'need_person': this.count,
        'bet_items': this.lotteryService.betsArr(this.superadditionArray.concat([this.lottery.number]), '_dlt')                              //所需人数
      }
    }
    )
      .subscribe(_order => {
        if (JSON.parse(_order['_body']).ret[0] == 'ok') {
          let _data=JSON.parse(_order['_body']).content;
          this.lottery.user_now_balance = this.lottery.user_now_balance - this.acount;
          this.shareHall(JSON.parse(_order['_body']).content.order_no);
          this.presentConfirm(_data);
        }
        else{
          this.presentAlert(JSON.parse(_order['_body']).msg);
        }
        // this.shareHall(JSON.parse(_order['_body']).content.order_no);
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
      }
      );
  }
  presentAlert(msg: string) {
    let alert = this.alertCtrl.create({
      title: '提示信息',
      subTitle: msg,
      buttons: ['确定']
    });
    alert.present();
  }
  presentConfirm(obj) {
    let alert = this.alertCtrl.create({
      title: '支付成功',
      message: '请选择分享的媒体',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.shareWechat(obj.max_amount, obj.site_id, this.lottery.icon_url);
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
  shareWechat(amount: number, order: number, icon_url: string) {
    if ((<any>window).appInterface != undefined) {
      (<any>window).appInterface.shareWeiChat('这是一个理论最高奖' + amount + '的红包', "彩店邀请码:" + order, icon_url, "http://www.rongqiangu.com/wechat-usr");
    } else {
      var params =
        {
          "text": "彩店邀请码:" + order,
          "imageUrl": icon_url,
          "title": '这是一个理论最高奖' + amount + '的红包',
          "titleUrl": "http://www.rongqiangu.com/wechat-usr",
          "description": "彩站助手",
          "site": "彩站助手",
          "siteUrl": "http://www.rongqiangu.com/wechat-usr",
          "type": $sharesdk.ContentType.Auto
        };
      $sharesdk.showShareMenu(null, params, 100, 100, function (reqId, platform, state, shareInfo, error) {
      });
    }
  }
}
