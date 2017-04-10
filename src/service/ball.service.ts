import { Injectable } from '@angular/core';

/**
* This class provides the Ball service with methods to read names and add names.
*/
@Injectable()
export class BallService {
  ssq: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33'];
  dlt: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
  ssqb: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16'];
  dltb: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  constructor() { }
  randomBall(num): any {
    if ((num) > 16) {
      return num == 33 ? this.ssq.sort(() => Math.random() - 0.5).slice(0, 6) : this.dlt.sort(() => Math.random() - 0.5).slice(0, 5);
    } else {
      return num == 12 ? this.ssqb.sort(() => Math.random() - 0.5).slice(0, 2) : this.dltb.sort(() => Math.random() - 0.5).slice(0, 1);
    }
  }
  forLoop = (red, blue) => this.randomBall(red).concat(this.randomBall(blue));
  creatBalls = (person) => this.forLoop(person.red, person.blue);

}
