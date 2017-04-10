import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
//模拟数据
import { Lottery } from '../../format/lottery';
import { LotteryService } from '../../service/lottery.service';
//加载的链接
import { DetailPage } from '../detail/detail';
import { DaletouPage } from '../daletou/daletou';
import { DingguaguaPage } from '../dingguagua/dingguagua';
import { JingcailanqiuPage } from '../jingcailanqiu/jingcailanqiu';
import { JingcaizuqiuPage } from '../jingcaizuqiu/jingcaizuqiu';
import { Pailie3Page } from '../pailie3/pailie3';
import { Pailie5Page } from '../pailie5/pailie5';
import { QilecaiPage } from '../qilecai/qilecai';
import { QixingcaiPage } from '../qixingcai/qixingcai';
import { Renxuan9Page } from '../renxuan9/renxuan9';
import { ShengfucaiPage } from '../shengfucai/shengfucai';
import { ShuangseqiuPage } from '../shuangseqiu/shuangseqiu';
import { FucaiPage } from '../fucai/fucai';
import { GuagualePage } from '../guaguale/guaguale';
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
    private lotteryService: LotteryService) {

  }
  getLotteries(): void {
    this.lotteryService.getHeroes().then(lotteries => this.lotteries = lotteries)
  }
  ngOnInit() {
    this.getLotteries();
  }
  goToDetails(page): void {
    this.navCtrl.push(DetailPage, {page});
  }
  goToSent(): void {
    this.navCtrl.push(RedEnvelopePage, {});
  }

}
