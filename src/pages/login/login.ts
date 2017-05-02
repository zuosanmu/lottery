import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private lotteryService: LotteryService,
  ) {
    // document.cookie = "android|user|1.0.0|000|proc|";
    // // this._cookieService.put('Cookie','android|user|5.2.1|000|proc|');
    // // this.headers.append('Cookie', 'android|user|5.2.1|000|proc|');
    // this.headers = new Headers({
    //   'Content-Type': 'text/plain;charset=UTF-8',
    //   'envelope':"android|user|1.0.0|000|proc|"
    // });
    // this.options = new RequestOptions({
    //   headers: this.headers,
    //   withCredentials: true
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  getToken(): void {
  this.lotteryService.getPost( {
        "req": "login",
        "content": {
          "site_id":1000203,
          "phone": 18615718184,
          "verification_code": 9237,
          "device_token": "sdf4443"
        }
      })
      .subscribe(
      data => {
        this.token = data;
      }
      )
  }
}
