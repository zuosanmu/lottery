import { Component, OnInit } from '@angular/core';
import { Broadcaster } from '@ionic-native/broadcaster';
import { NavController, AlertController } from 'ionic-angular';
//模拟数据
import { Lottery } from '../../format/lottery';
import { LotteryService } from '../../service/lottery.service';
//加载的链接
import { DetailPage } from '../detail/detail';
// import { DaletouPage } from '../daletou/daletou';
// import { DingguaguaPage } from '../dingguagua/dingguagua';
// import { JingcailanqiuPage } from '../jingcailanqiu/jingcailanqiu';
// import { JingcaizuqiuPage } from '../jingcaizuqiu/jingcaizuqiu';
// import { Pailie3Page } from '../pailie3/pailie3';
// import { Pailie5Page } from '../pailie5/pailie5';
// import { QilecaiPage } from '../qilecai/qilecai';
// import { QixingcaiPage } from '../qixingcai/qixingcai';
// import { Renxuan9Page } from '../renxuan9/renxuan9';
// import { ShengfucaiPage } from '../shengfucai/shengfucai';
// import { ShuangseqiuPage } from '../shuangseqiu/shuangseqiu';
// import { FucaiPage } from '../fucai/fucai';
// import { GuagualePage } from '../guaguale/guaguale';
import { RedEnvelopePage } from '../red-envelope/red-envelope';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  lotteries: Lottery[]=[];
  selectedLottery: Lottery;
  cookies;
  replaykey:boolean=false;
  private
  constructor(
    public navCtrl: NavController,
    private lotteryService: LotteryService,
    private broadcaster: Broadcaster,
    public alertCtrl: AlertController) {
    let _that = this;
    function setupWebViewJavascriptBridge(callback) {
      if ((<any>window).WebViewJavascriptBridge) {
        alert('WebViewJavascriptBridge');
        return callback((<any>window).WebViewJavascriptBridge);
      }
      if ((<any>window).WVJBCallbacks) {
        alert('WVJBCallbacks');
        return (<any>window).WVJBCallbacks.push(callback);
      }
      (<any>window).WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'https://__bridge_loaded__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('loginAction', {}, function (response) {
        _that.cookies = response;
      })
    })
  }
  getLotteries(): void {
    this.lotteryService.getPost({
      "req": "get_red_envelopes",
      "content": {
        'offset': 1
      }
    }
    )
      .subscribe(lotteries => {
        if (!!JSON.parse(lotteries._body).content) {
          this.lotteries = JSON.parse(lotteries._body).content.envelope_list||[];
        }
        console.log(this.lotteries);
      }
      );
  }
  ngOnInit() {
    if ((<any>window).navigator.userAgent.indexOf('iPhone') != -1) {
       setTimeout(()=> this.replaykey=true, 1000);
      setTimeout(() => {
        this.lotteryService.getcookies(this.cookies);
        this.getLotteries()
      }
        ,
        300)
    } else {
       setTimeout(()=> this.replaykey=true, 10000);
      this.getLotteries();
    }
    this.getIdentity('');
  }
  goToDetails(page): void {
    if (page.receive_status) {

    }
    this.navCtrl.push(DetailPage, { page });
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: '这个红包已经抢过啦！',
      subTitle: "你在个人信息里面查看",
      buttons: ['确定']
    });
    alert.present();
  }
  goToSent(): void {
    this.navCtrl.push(RedEnvelopePage, {});
  }
  goback() {
    if ((<any>window).appInterface != undefined) {
      (<any>window).appInterface.goback();
    } else {

      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('goback', {}, function (response) {
        });
      })
    }
    function setupWebViewJavascriptBridge(callback) {
      if ((<any>window).WebViewJavascriptBridge) {
        return callback((<any>window).WebViewJavascriptBridge);
      }
      if ((<any>window).WVJBCallbacks) {
        return (<any>window).WVJBCallbacks.push(callback);
      }
      (<any>window).WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'https://__bridge_loaded__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
    }

  }
  ionViewDidEnter(){
   if(this.replaykey){
      this.getLotteries();
      console.log('ionViewDidEnter');
    }
  }
  ionViewWillEnter(){


  }
  getIdentity(data) {
    console.log(data);
  }
  fireNative(message) {
    // Send event to Native
    console.log('send to native', message);
    this.broadcaster.fireNativeEvent('testNative', { item: message }).then(() => console.log('success'));
  }
}
