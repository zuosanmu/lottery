import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { LotteryService } from '../../service/lottery.service';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private token;
  private headers = new Headers({
    'Content-Type': 'text/plain;charset=UTF-8',
    'Cookie': 'android|user|5.2.1|000|proc|'
  });
  private options;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private lotteryService: LotteryService,
    public http: Http,
    public requestoptions: RequestOptions) {
    this.options = new RequestOptions({
      headers: this.headers,
      withCredentials: true
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  getToken(): void {
    this.http
      .post('http://139.224.195.129:80/rainstorm/start',
      {
        "req": "login",
        "content": {
          "phone": 18615718184,
          "verification_code": 9237,
          "device_token": "sdf4443"
        }
      }
      ,
      this.options)
      .map(res => {
        return res;
      })
      .subscribe(
      data => {
        this.token = data;
        alert(data);
      }
      )
    //   this.http().then(res =>
    //   {
    //     this.token = res;
    //     console.log(this.token);
    //   }
    //   )
  }
}
