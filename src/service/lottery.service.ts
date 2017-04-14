import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Lottery } from '../format/lottery';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LotteryService {
  private heroesUrl = 'api/lotteries';
  private headers = new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' });
  constructor(private http: Http) { }
  getHeroes(): Promise<Lottery[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Lottery[])
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  // See the "Take it slow" appendix
  getHeroesSlowly(): Promise<Lottery[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }
  getHero(id: number): Promise<Lottery> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Lottery)
      .catch(this.handleError);
  }
  update(hero: Lottery): Promise<Lottery> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), { headers: this.headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }
  create(name:string):Promise<Lottery>{
    return this.http
    .post(this.heroesUrl,JSON.stringify({name:name}),{headers:this.headers})
    .toPromise()
    .then(res=>res.json().data)
    .catch(this.handleError);
  }
  delete(id:number):Promise<void>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url,{headers:this.headers})
    .toPromise()
    .then(()=>null)
    .catch(this.handleError);
  }
}
