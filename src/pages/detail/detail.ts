import { Component,OnInit } from '@angular/core';
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
  public detail={
    amount: 1,
  attend_info_list: [{}],
  bet_count: 1,
  bet_number: 1,
  envelope_create_time: 'a',
  icon_url: 'string',
  issue_no: 1,
  lottery_order_list:[{}],
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
  ngOnInit(){
    this.getDetailData();
  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: '正在争分夺秒...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
      this.lottery.participator.push({
        name: '王总',
        percent: 12,
        time: '2017-4-20'
      })
    }, 5000);
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
        'order_no':this.lottery.order_no,
        'lottery_type':this.lottery.lottery_type
      }
    }, 'android|user|1.0.0|000|proc|1qo0anb8dhpn1ask56dbwgtt8iosf5oaxh3rrfoejsusmtwo5n7gxv4rhbs49n1uh3e8v9igjamnc9p6ktblm3xm0cjk48ctx5mlfliaut1qb5to6s5vugrs83bwvmgs')
     .subscribe(data => {
        this.detail =JSON.parse(data['_body']).content;
        //  JSON.parse(lotteries._body).content.envelope_list;
        console.log(this.detail);
      }
      );
  }
  //微信分享
  shareWechat() {
    // Wechat.share({
    //   text: "This is just a plain string",
    //   scene: Wechat.Scene.TIMELINE   // share to Timeline
    // }, function () {
    //   alert("Success");
    // }, function (reason) {
    //   alert("Failed: " + reason);
    // });
    if ((<any>window).appInterface != undefined) {
      (<any>window).appInterface.shareWeiChat('分享', '这是一个分享', 'http://rongqiangu-dev.oss-cn-hangzhou.aliyuncs.com/icon-img/ah_11x5.png', 'http://139.224.195.129/red-packet/#/detailweb');
    }

    // let wechat = (<any>window).Wechat;
    // wechat.isInstalled(function (installed) {
    //   if(!installed){
    //     this.toastService.show('您没有安装微信！');
    //     return ;
    //   }
    // }, function (reason) {
    //     this.toastService.show("Failed: " + reason);
    // });
    // wechat.share({
    // message: {
    //     title: 'this.shareImg',
    //     description: 'this.shareDesc',
    //     thumb: 'this.shareImg',
    //     media: {
    //         type: wechat.Type.LINK,
    //         webpageUrl: 'www.baidu.com'
    //     }
    // },
    //     scene: wechat.Scene.TIMELINE   // share to Timeline
    // }, function () {
    //    this.toastService.show('分享成功','bottom',4000);
    // }, function (reason) {
    //     console.log("Failed: " + reason);
    // });
    // shareWebPageToWechatSession();
    // function checkWechatClient() {
    //   sharesdk.isInstallClient.promise(ShareSDK.ClientType.Wechat).then(function (isInstall) {
    //     if (isInstall) {
    //       alert("微信客户端已安装");
    //     } else {
    //       alert("未安装微信客户端");
    //     }
    //   });
    // }
    // /** 分享网页 */
    // function shareWebPage(platformType) {
    //   var icon = 'https://raw.githubusercontent.com/zhaolin0801/cordova-sharesdk-demo/master/www/img/Wechat-QRcode.jpeg';
    //   var title = '这是网页的标题';
    //   var text = '这是网页的内容，android未签名只能分享单张图片到朋友圈';
    //   var url = 'http://carhot.cn/articles/1';
    //   var shareInfo = { icon: icon, title: title, text: text, url: url };
    //   sharesdk.share(platformType, ShareSDK.ShareType.WebPage, shareInfo, success, fail);
    // }
    // function shareWebPageToWechatSession() {
    //   shareWebPage(ShareSDK.PlatformType.WechatSession);
    // }
    // function success() {
    //   alert('sucessed!');
    // }

    // function fail(msg) {
    //   if (msg.state == ShareSDK.ResponseState.Cancel) {
    //     alert('cancel！');
    //   } else {
    //     alert('failed！: ' + msg.error);
    //   }
    // }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
