import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import { LotteryService } from '../../service/lottery.service';
/*
  Generated class for the Detail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage implements OnInit {
  public lottery;
  public details;
  public detail = {
    amount: 1,
    attend_info_list: [{
      user_name: '',
      envelope_ratio: '',
      can_winning_amount: '',
      receive_time: ''
    }],
    envelope_type: 'stirng',
    bet_count: 1,
    bet_number: 1,
    envelope_create_time: 'a',
    icon_url: 'string',
    issue_no: 1,
    lottery_order_list: [''],
    lottery_type: 'string',
    need_person: 1,
    purchase_cut_off_time: 'string',
    receive_status: false,
    sponsor: "string",
    title: 'string'
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public LotteryService: LotteryService
  ) {
    this.lottery = this.navParams.get('page');
  }
  ngOnInit() {
    this.getDetailData();
  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: '正在争分夺秒...'
    });

    loading.present();
    this.LotteryService.getPost({
      "req": "receive_envelope",
      "content": {
        'order_no': this.lottery.order_no,
        'envelope_type': this.detail.envelope_type
      }
    })
      .subscribe(data => {
        loading.dismiss();
        this.details = JSON.parse(data['_body']).content;
        this.detail.receive_status = true;
        this.detail.attend_info_list ? this.detail.attend_info_list.push({
          user_name: this.details.user_name,
          envelope_ratio: this.details.envelope_ratio,
          receive_time: this.details.receive_time,
          can_winning_amount: this.details.amount
        }) : this.detail.attend_info_list = [{
          user_name: this.details.user_name,
          envelope_ratio: this.details.envelope_ratio,
          receive_time: this.details.receive_time,
          can_winning_amount: this.details.amount
        }];
        console.log(this.details);
      }
      );
  }
  presentActionSheet() {
    this.presentLoadingDefault();
    // let actionSheet = this.actionSheetCtrl.create({
    //   title: '你的彩店数已达到上限,请删除一个',
    //   buttons: [
    //     {
    //       text: '胖哥1店',
    //       handler: () => {
    //         console.log('删除胖哥1店');
    //       }
    //     },
    //     {
    //       text: '胖哥2店',
    //       handler: () => {
    //         console.log('删除胖哥1店');
    //       }
    //     },
    //     {
    //       text: '胖哥3店',
    //       handler: () => {
    //         console.log('删除胖哥1店');
    //       }
    //     },
    //     {
    //       text: '胖哥4店',
    //       handler: () => {
    //         console.log('删除胖哥1店');
    //       }
    //     },
    //     {
    //       text: '取消',
    //       role: 'cancel',
    //       handler: () => {
    //         console.log('Cancel clicked');
    //       }
    //     }
    //   ]
    // });

    // actionSheet.present();
  }
  presentConfirm() {
    this.navCtrl.popToRoot();
  }
  //向后台申请数据
  getDetailData() {
    if (this.lottery.lottery_type == '_dgg' || this.lottery.lottery_type == '_ggl') {
      this.LotteryService.getPost({
        "req": "scratch_envelope_bet_info",
        "content": {
          'order_no': this.lottery.order_no
        }
      })
        .subscribe(data => {
          if (data['_body'].indexOf('failed') !== -1) {
            let alert = this.alertCtrl.create({
              title: '提示信息',
              subTitle: "服务器迷失在雾霾中",
              buttons: ['确定']
            });
            alert.present();
          } else {
            this.detail = JSON.parse(data['_body']).content;
            console.log(this.detail);
          }

        }
        );
    } else {
      this.LotteryService.getPost({
        "req": "envelope_bet_info",
        "content": {
          'order_no': this.lottery.order_no,
          'lottery_type': this.lottery.lottery_type
        }
      })
        .subscribe(data => {
          if (data['_body'].indexOf('failed') !== -1) {
            let alert = this.alertCtrl.create({
              title: '提示信息',
              subTitle: "服务器迷失在雾霾中",
              buttons: ['确定']
            });
            alert.present();
          } else {
            this.detail = JSON.parse(data['_body']).content;
            console.log(this.detail);
          }
        }
        );
    }

  }
  //微信分享
  shareWechat(amount: number, order: number, icon_url: string) {
    if ((<any>window).appInterface != undefined) {
      (<any>window).appInterface.shareWeiChat('这是一个理论最高奖' + amount + '的红包', "彩店邀请码:" + order, icon_url, "http://www.rongqiangu.com/wechat-usr");
    } else {
      var params =
            {
                "text" : "彩店邀请码:" + order,
                "imageUrl" : icon_url,
                "title" : '这是一个理论最高奖' + amount + '的红包',
                "titleUrl" : "http://www.rongqiangu.com/wechat-usr",
                "description" : "彩站助手",
                "site" : "彩站助手",
                "siteUrl" : "http://www.rongqiangu.com/wechat-usr",
                "type" : $sharesdk.ContentType.Auto
            };
      $sharesdk.showShareMenu(null, params, 100, 100, function (reqId, platform, state, shareInfo, error) {
      });
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
}
