import { Component, OnInit } from '@angular/core';
import { Broadcaster } from '@ionic-native/broadcaster';
import { NavController } from 'ionic-angular';
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
  private
  constructor(
    public navCtrl: NavController,
    private lotteryService: LotteryService,
    private broadcaster: Broadcaster) {

  }
  getLotteries(): void {
    this.lotteryService.getPost({
      "req": "get_red_envelopes",
      "content": {
        'offset': 1
      }
    }
      ,
      'android|user|1.0.0|000|proc|1qo0anb8dhpn1ask56dbwgtt8iosf5oaxh3rrfoejsusmtwo5n7gxv4rhbs49n1uh3e8v9igjamnc9p6ktblm3xm0cjk48ctx5mlfliaut1qb5to6s5vugrs83bwvmgs')
      .subscribe(lotteries => {
        this.lotteries = JSON.parse(lotteries._body).content.envelope_list;
        console.log(this.lotteries);
      }
      );
  }
  ngOnInit() {
    this.getLotteries();
    this.getIdentity('');
  }
  goToDetails(page): void {
    this.navCtrl.push(DetailPage, { page });
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
