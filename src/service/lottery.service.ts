import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/observable';
@Injectable()
export class LotteryService {
  private heroesUrl = 'http://139.224.195.129:80/rainstorm/envelope';
  // private heroesUrl = 'http://192.168.0.109:8080/rainstorm/envelope';
  private headers;
  private options;
  private cookies;
  constructor(private http: Http) {
    if ((<any>window).appInterface != undefined) {
      this.cookies = (<any>window).window.appInterface.getCookie();
    }
  }
  setHeaders(cookieValue: string) {
    // document.cookie = "android|user|1.0.0|000|proc|"; //这里是正式请求中的cookie设置；
    // document.cookie = cookieValue;
    this.headers = new Headers({//数据交互的头文件校验
      'Content-Type': 'text/plain;charset=UTF-8',
      'envelope': cookieValue
    });
    this.options = new RequestOptions({
      headers: this.headers,
      withCredentials: true
    });
  }
  getPost(req,): Observable<any> {
    // this.setHeaders(this.cookies);
    this.setHeaders("android|user|1.0.0|000|proc|1qo0anb8dhpn1ask56dbwgtt8iosf5oaxh3rrfoejsusmtwo5n7gxv4rhbs49n1uh3e8v9igjamnc9p6ktblm3xm0cjpgc4o3e2odxnakwenk69upvpb5ij25eur3nw8");
    return this.http
      .post(this.heroesUrl, req, this.options);
  }

}
