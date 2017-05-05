import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
  ballArray_ssq: string[];
  ballArray_dlt: string[];
  participants: number;
  user_now_balance: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private lotteryService: LotteryService,
    public alertCtrl: AlertController, ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedEnvelopePage');
  }
  getLotteries(): void {
    this.lotteryService.getPost({
      "req": "get_new_issues",
      "content": {
      }
    }
    )
      .subscribe(lotteries => {
        let lot = JSON.parse(lotteries['_body']).content;
        this.user_now_balance = lot.user_now_balance;
        this.lotteries = lot.lottery_info;
        console.log(this.lotteries);
      });
  }
  ngOnInit() {
    this.getLotteries();
  }
  receiveshuangseqiu(msg: string[]) {
    this.ballArray_ssq = msg;
  }
  receiveguaguale(msg: number) {
    this.participants = msg;
  }
  receivedaletou(msg: string[]) {
    this.ballArray_dlt = msg;
  }
  goToDetails(page): void {
    let detailPage;
     page.user_now_balance = this.user_now_balance;
    if (page.lottery_type === '_ggl' || page.lottery_type === '_dgg') {
      this.lotteryService.getPost({
        "req": "get_scratch_type_info",
        "content": {
          scratch_face_value: this.participants,
          lottery_type: page.lottery_type
        }
      }
      )
        .subscribe(arraies => {
          console.log(arraies['_body'].indexOf('{}'));
          if (arraies['_body'].indexOf('{}')==-1) {
            page.participants = this.participants;
            detailPage = GuagualePage;
            this.navCtrl.push(detailPage, { page });
          } else {
            this.presentAlert('该面值的卖完了');
          }

        });

    } else {
      switch (page.lottery_type) {
        case '_ssq':
          page.number = this.ballArray_ssq;
          detailPage = ShuangseqiuPage;
          break;
        case '_dlt':
          page.number = this.ballArray_dlt;
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
        case 13:
          detailPage = RenxuanqiuPage;
          break;

        default:
          break;
      }
      this.navCtrl.push(detailPage, { page });
    }
  }
  presentAlert(msg: string) {
    let alert = this.alertCtrl.create({
      title: '提示信息',
      subTitle: msg,
      buttons: ['确定']
    });
    alert.present();
  }
}
