import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/observable';
@Injectable()
export class LotteryService {
  private heroesUrl = 'http://192.168.0.109:8080/rainstorm/envelope';
  private headers = new Headers({
    'Content-Type': 'text/plain;charset=UTF-8',
  });
  private options;
  constructor(private http: Http) {
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  setHeaders(cookieValue: string) {
    // document.cookie = "android|user|1.0.0|000|proc|";
    // document.cookie = cookieValue;
    this.headers.append('envelope', cookieValue);
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
  // See the "Take it slow" appendix
//   getHeroesSlowly(): {
//     return new Promise(resolve => {
//   // Simulate server latency with 2 second delay
//   setTimeout(() => resolve(this.getHeroes()), 2000);
// });
//   }
// getHero(id: number): Promise < Lottery > {
//   const url = `${this.heroesUrl}/${id}`;
//   return this.http.get(url)
//     .then(response => response.json().data as Lottery)
//     .catch(this.handleError);
// }
// update(hero: Lottery): Promise < Lottery > {
//   const url = `${this.heroesUrl}/${hero.id}`;
//   return this.http
//     .put(url, JSON.stringify(hero), { headers: this.headers })
//     .then(() => hero)
//     .catch(this.handleError);
// }
// create(name: string): Promise < Lottery > {
//   return this.http
//     .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
//     .then(res => res.json().data)
//     .catch(this.handleError);
// }
// delete (id: number): Promise < void> {
//   const url = `${this.heroesUrl}/${id}`;
//   return this.http.delete(url, { headers: this.headers })
//     .then(() => null)
//     .catch(this.handleError);
// }
// }
