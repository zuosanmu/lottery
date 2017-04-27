import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Lottery } from '../../format/lottery';
import { LotteryService } from '../../service/lottery.service';
//加载页面
import { DaletouPage } from '../daletou/daletou';
import { DingguaguaPage } from '../dingguagua/dingguagua';
import { JingcailanqiuPage } from '../jingcailanqiu/jingcailanqiu';
import { JingcaizuqiuPage } from '../jingcaizuqiu/jingcaizuqiu';
import { Pailie3Page } from '../pailie3/pailie3';
import { Pailie5Page } from '../pailie5/pailie5';
import { QilecaiPage } from '../qilecai/qilecai';
import { QixingcaiPage } from '../qixingcai/qixingcai';
import { RenxuanqiuPage } from '../renxuanqiu/renxuanqiu';
import { ShengfucaiPage } from '../shengfucai/shengfucai';
import { ShuangseqiuPage } from '../shuangseqiu/shuangseqiu';
import { FucaiPage } from '../fucai/fucai';
import { GuagualePage } from '../guaguale/guaguale';
/*
  Generated class for the RedEnvelope page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-red-envelope',
  templateUrl: 'red-envelope.html'
})
export class RedEnvelopePage implements OnInit {
  lotteries: Lottery[];
  ballArray: string[];
  participants: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private lotteryService: LotteryService) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedEnvelopePage');
  }
  getLotteries(): void {
    this.lotteryService.getPost({
      "req": "get_new_issues",
      "content": {
      }
    }
      ,
      'android|user|1.0.0|000|proc|1qo0anb8dhpn1ask56dbwgtt8iosf5oaxh3rrfoejsusmtwo5n7gxv4rhbs49n1uh3e8v9igjamnc9p6ktblm3xm0cjk48ctx5mlfliaut1qb5to6s5vugrs83bwvmgs')
      .subscribe(lotteries => {
        this.lotteries = JSON.parse(lotteries['_body']).content.lottery_info;
        console.log(this.lotteries);
      });
  }
  ngOnInit() {
    this.getLotteries();
  }
  receiveshuangseqiu(msg: string[]) {
    this.ballArray = msg;
  }
  receiveguaguale(msg: number) {
    this.participants = msg;
  }
  receivedaletou(msg: string[]) {
    this.ballArray = msg;
  }
  goToDetails(page): void {
    let detailPage;
    switch (page.lottery_type) {
      case '_ssq':
        page.number = this.ballArray;
        detailPage = ShuangseqiuPage;
        break;
      case '_dlt':
        page.number = this.ballArray;
        detailPage = DaletouPage;
        break;
      case 3:
        detailPage = Pailie3Page;
        break;
      case 4:
        detailPage = Pailie5Page;
        break;
      case 5:
        detailPage = QilecaiPage;
        break;
      case 6:
        detailPage = QixingcaiPage;
        break;
      case 7:
        detailPage = JingcaizuqiuPage;
        break;
      case 8:
        detailPage = JingcailanqiuPage;
        break;
      case 9:
        detailPage = ShengfucaiPage;
        break;
      case 10:
        detailPage = DingguaguaPage;
        break;
      case 11:
        detailPage = FucaiPage;
        break;
      case '_ggl':
      case '_dgg':
        page.participants = this.participants;
        detailPage = GuagualePage;
        break;
      case 13:
        detailPage = RenxuanqiuPage;
        break;

      default:
        break;
    }
    this.navCtrl.push(detailPage, { page });
  }
}
