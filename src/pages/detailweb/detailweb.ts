import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import { BallService } from '../../service/ball.service';
/*
  Generated class for the Detail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detailweb',
  templateUrl: 'detailweb.html'
})
export class detailwebPage {
  private lottery;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.lottery = {
        id: 1,
        name: '双色球',
        issue: '20170228',
        shareTime: '01-05 12:27:31',
        awardAmount: 500000,
        current: 1,
        total: 10,
        participator:[
          {
            name:'张三',
            percent:12,
            time:'2017-4-17'
          },
          {
            name:'李四',
            percent:30,
            time:'2017-04-7'
          },
          {
            name:'王五',
            percent:1,
            time:'2017-04-7'
          },
          {
            name:'赵六',
            percent:2,
            time:'2017-04-7'
          },
        ]
      }
  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: '正在争分夺秒...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
      this.alertComfrim();
      this.lottery.participator.push({
        name: '王总',
        percent: 12,
        time: '2017-4-20'
      })
    }, 5000);
  }
  alertComfrim() {
  let alert = this.alertCtrl.create({
    title: '抢到红包',
    message: '请下载app进行查看',
    buttons: [
      {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: '确定',
        handler: () => {
          window.location.href="http://139.224.195.129:7788/apk/lottery_v1.0.0_rqg_debug.apk";
        }
      }
    ]
  });
  alert.present();
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
  shareWechat() {
    shareWebPageToWechatSession();
    function checkWechatClient() {
      sharesdk.isInstallClient.promise(ShareSDK.ClientType.Wechat).then(function (isInstall) {
        if (isInstall) {
          alert("微信客户端已安装");
        } else {
          alert("未安装微信客户端");
        }
      });
    }
    /** 分享网页 */
    function shareWebPage(platformType) {
      var icon = 'https://raw.githubusercontent.com/zhaolin0801/cordova-sharesdk-demo/master/www/img/Wechat-QRcode.jpeg';
      var title = '这是网页的标题';
      var text = '这是网页的内容，android未签名只能分享单张图片到朋友圈';
      var url = 'http://carhot.cn/articles/1';
      var shareInfo = { icon: icon, title: title, text: text, url: url };
      sharesdk.share(platformType, ShareSDK.ShareType.WebPage, shareInfo, success, fail);
    }
    function shareWebPageToWechatSession() {
      shareWebPage(ShareSDK.PlatformType.WechatSession);
    }
    function success() {
      alert('sucessed!');
    }

    function fail(msg) {
      if (msg.state == ShareSDK.ResponseState.Cancel) {
        alert('cancel！');
      } else {
        alert('failed！: ' + msg.error);
      }
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad detailwebPage');
  }

}
