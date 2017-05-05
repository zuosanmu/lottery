import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LotteryService } from '../../service/lottery.service';
/*
  Generated class for the Guaguale page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-guaguale',
  templateUrl: 'guaguale.html'
})
export class GuagualePage implements OnInit {
  private lottery;
  private species = {
    'scratch_title': 'stirng',
    'scratch_type_id': 'string'
  };
  private count: number = 1;
  private acount: number;
  private multiple: number = 1;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public lotteryService: LotteryService) {
    this.lottery = this.navParams.get('page');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShuangseqiuPage');
  }
  ngOnInit() {
    this.lotteryService.getPost({
      "req": "get_scratch_type_info",
      "content": {
        'scratch_face_value': this.lottery.participants,
        'lottery_type': this.lottery.lottery_type
      }
    }
    )
      .subscribe(data => {
        if (!!JSON.parse(data['_body']).content.scratch_list) {
          console.log(JSON.parse(data['_body']).content);
          this.species = JSON.parse(data['_body']).content.scratch_list[0];
        }
        console.log(this.species);
      }
      );
  }
  pay() {
    this.acount = (this.lottery.participants) * this.multiple;
    if (this.acount > this.lottery.purchase_cut_off_time) {
      this.presentConfirm_no();
    } else {
      this.bet();
    }

  }
  bet() {
    this.lotteryService.getPost({
      "req": "scratch_envelope_bet",
      content: {
        'lottery_type': this.lottery.lottery_type,                                        //彩种
        'scratch_face_value': this.lottery.participants,                           // 面值
        'scratch_number': this.multiple,                                  // 张数
        'need_person': this.count,                                     //所需人数
        'amount': this.acount,                                                //金额
        'scratch_type_id': this.species.scratch_type_id                             //刮刮彩种类编号
      }
    }
    )
      .subscribe(_order => {
        if (JSON.parse(_order['_body']).ret[0] == 'ok') {
          let _data = JSON.parse(_order['_body']).content;
          this.lottery.user_now_balance = this.lottery.user_now_balance - this.acount;
          this.shareHall(JSON.parse(_order['_body']).content.order_no);
          this.presentConfirm(_data);
        } else {
          this.presentAlert(JSON.parse(_order['_body']).msg);
        }
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
  presentConfirm_test() {
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
