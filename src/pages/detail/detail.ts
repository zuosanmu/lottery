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
    this.wechatInit()
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
        console.log(data);
        loading.dismiss();
        this.details = JSON.parse(data['_body']).content;
        this.detail.attend_info_list.push({
          user_name: this.details.user_name,
          envelope_ratio: this.details.envelope_ratio,
          receive_time: this.details.receive_time,
          can_winning_amount: this.details.amount
        })
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
  //   test(){
  //   Wechat.share({
  //     text: "This is just a plain string",
  //     scene: Wechat.Scene.TIMELINE   // share to Timeline
  //   }, function () {
  //     alert("Success");
  //   }, function (reason) {
  //     alert("Failed: " + reason);
  //   });
  // }

  //向后台申请数据
  getDetailData() {
    this.LotteryService.getPost({
      "req": "envelope_bet_info",
      "content": {
        'order_no': this.lottery.order_no,
        'lottery_type': this.lottery.lottery_type
      }
    })
      .subscribe(data => {
        this.detail = JSON.parse(data['_body']).content;
        //  JSON.parse(lotteries._body).content.envelope_list;
        console.log(this.detail);
      }
      );
  }
  //微信分享
  shareWechat(amount:number,order:number,icon_url:string) {
    if ((<any>window).appInterface != undefined) {
      (<any>window).appInterface.shareWeiChat('这是一个理论最高奖'+amount+'的红包',"彩店邀请码:"+order, icon_url, "http://www.rongqiangu.com/wechat-usr");
    }
    var params = {
      "text": "彩店邀请码:"+order, // 分享的文字
      "imageUrl": icon_url, // 分享的图片 Url
      "title": '这是一个理论最高奖'+amount+'的红包', //分享的标题
      "titleUrl": "http://rongqiangu-dev.oss-cn-hangzhou.aliyuncs.com/icon-img/ah_11x5.png",
      "description": "测试的描述",
      "site": "ShareSDK",
      "siteUrl": "http://www.rongqiangu.com/wechat-usr",
      "type": $sharesdk.ContentType.Text
    };
    $sharesdk.shareContent($sharesdk.PlatformID.WechatPlatform, params, function (platform, state, shareInfo, error) {
      alert("state = " + state + "\n shareInfo = " + shareInfo + "\n error = " + error);
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  wechatInit() {
    (<any>window).platformConfig = {};
    var weixinConf = {};
    weixinConf["app_id"] = "wx12d852635e90b353";
    weixinConf["app_secret"] = "29f71745fd51dd94f5b56e3b0b1fc4b3";
    (<any>window).platformConfig[$sharesdk.PlatformID.WechatPlatform] = weixinConf;
  }
}
