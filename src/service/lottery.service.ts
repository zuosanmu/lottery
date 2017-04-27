import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/observable';
@Injectable()
export class LotteryService {
  private heroesUrl = 'http://c1706v0409.iok.la:20762/rainstorm/envelope';//后台映射出来的测试端口
  private headers;
  private options;
  constructor(private http: Http) {
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
  getPost(req, cookieValue: string): Observable<any> {
    this.setHeaders(cookieValue);
    return this.http
      .post(this.heroesUrl, req, this.options);
  }

}
