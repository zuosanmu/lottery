import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LotteryService } from '../../service/lottery.service';
/*
  Generated class for the Dingguagua page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dingguagua',
  templateUrl: 'dingguagua.html'
})
export class DingguaguaPage implements OnInit {
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
        'lottery_type': '_dgg'
      }
    }
    )
      .subscribe(data => {
       if(!!JSON.parse(data['_body']).content.scratch_list){
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
        'lottery_type': '_ggl',                                        //彩种
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
        this.navCtrl.popToRoot();
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

