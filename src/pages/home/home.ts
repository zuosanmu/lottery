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
  lotteries: Lottery[];
  selectedLottery: Lottery;
  cookies;
  private
  constructor(
    public navCtrl: NavController,
    private lotteryService: LotteryService,
    private broadcaster: Broadcaster,
    public alertCtrl: AlertController) {

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
          this.lotteries = JSON.parse(lotteries._body).content.envelope_list
        }
        console.log(this.lotteries);
      }
      );
  }
  ngOnInit() {
    this.getLotteries();
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
  getIdentity(data) {
    console.log(data);
  }
  fireNative(message) {
    // Send event to Native
    console.log('send to native', message);
    this.broadcaster.fireNativeEvent('testNative', { item: message }).then(() => console.log('success'));
  }
}
