import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/observable';
@Injectable()
export class LotteryService {
  private heroesUrl = 'http://www.scjingyu.com/rainstorm/envelope';
  // private heroesUrl = 'http://192.168.0.109:8080/rainstorm/envelope';
  private headers;
  private options;
  private cookies;
  constructor(private http: Http) {
    if ((<any>window).appInterface != undefined) {
      this.cookies = (<any>window).appInterface.getCookie();
    }
    (<any>window).platformConfig = {};
    //新浪微博
    var sinaConf = {};
    sinaConf["app_key"] = "2023073395";
    sinaConf["app_secret"] = "986316ec6ca779bfe3ca27b95ada3c90";
    sinaConf["redirect_uri"] = "https://api.weibo.com/oauth2/default.html";
    (<any>window).platformConfig[$sharesdk.PlatformID.SinaWeibo] = sinaConf;
    //微信
    var weixinConf = {};
    weixinConf["app_id"] = "wxe4eb703dedc403e5";
    weixinConf["app_secret"] = "bc18caf38e6edadfca7541562db0da78";
    (<any>window).platformConfig[$sharesdk.PlatformID.WechatPlatform] = weixinConf;
    //微信朋友圈
    var weixinMoments = {};
    weixinConf["app_id"] = "wxe4eb703dedc403e5";
    weixinConf["app_secret"] = "bc18caf38e6edadfca7541562db0da78";
    (<any>window).platformConfig[$sharesdk.PlatformID.WeChatMoments] = weixinMoments;
    //QQ
    var qqConf = {};
    qqConf["app_id"] = "1106029522";
    qqConf["app_key"] = "IBvHAYRGGYVyO5K0";
    (<any>window).platformConfig[$sharesdk.PlatformID.QQPlatform] = qqConf;
  }
  setHeaders(cookieValue: string) {
    this.headers = new Headers({//数据交互的头文件校验
      'Content-Type': 'text/plain;charset=UTF-8',
      'envelope': cookieValue
    });
    this.options = new RequestOptions({
      headers: this.headers,
      withCredentials: true
    });
  }
  getPost(req): Observable<any> {
    this.setHeaders(this.cookies);
    // this.setHeaders('android|user|1.0.0|000|proc|lsctbdakl12hnhu56cvvv3mc7tk1mxg8ruhls90ehtxeqrltasfb79k3048i55eqwqpk08obixh938733547mcguv1djf56cfnwf0xmuviaf3qdxqnfwp2ku0');
    // this.setHeaders('android|user|1.0.0|000|proc|1qo0anb8dhpn1ask56dbwgtt8iosf5oaxh3rrfoejsusmtwo5n7gxv4rhbs49n1uh3e8v9igjamnc9p6ktblm3xm0cx2b5p4hbpdl1wvq77irvq9qmctcdkah6982xb2');
    return this.http
      .post(this.heroesUrl, req, this.options);
  }
  getcookies(cookie): void {
    this.cookies = cookie;
  }
  betsArr(ballArrs: any, type: string) {
    let _arr = [];
    ballArrs.forEach(element => {
      _arr.push({
        'play_type': '_01',                      //玩法
        'bet_item': this.pipeball(element, type),                     //投注项
        'bet_type': '_01',                       //投注类型
        'bet_amount': 2,                       //投注金额
      });
    });
    return _arr;
  }
  pipeball(ballArr: string[], type: string): string {
    let _arr = ballArr.join();
    switch (type) {
      case "_ssq":
        return _arr.slice(0, 17) + _arr.slice(17).replace(/,/, '#');
      case "_dlt":
        return _arr.slice(0, 14) + _arr.slice(14).replace(/,/, '#');
      default:
        break;
    }
    return
  }
}
