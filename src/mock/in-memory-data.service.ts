import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let lotteries = [
      {
        id: 1,
        name: '双色球',
        issue: '20170228',
        shareTime: '01-05 12:27:31',
        awardAmount: 500000,
        current: 1,
        total: 10,
        participator:[
          {
            name:'张三',
            percent:12,
            time:'2017-4-17'
          },
          {
            name:'李四',
            percent:30,
            time:'2017-04-7'
          },
          {
            name:'王五',
            percent:1,
            time:'2017-04-7'
          },
          {
            name:'赵六',
            percent:2,
            time:'2017-04-7'
          },
        ]
      },
      {
        id: 2,
        name: '大乐透',
        issue: '20170228', shareTime: '01-05 12:27:31',
        awardAmount: 500000,
        current: 4,
        total: 4,
        participator:[
          {
            name:'张三',
            percent:12,
            time:'2017-4-17'
          },
          {
            name:'李四',
            percent:30,
            time:'2017-04-7'
          },
          {
            name:'王五',
            percent:1,
            time:'2017-04-7'
          },
          {
            name:'赵六',
            percent:2,
            time:'2017-04-7'
          },
        ]
      },
      /*{
        id: 3,
        name: '排列3',
        issue: '20170228', shareTime: '01-05 12:27:31',
        awardAmount: 500000,
        current: 1,
        total: 10,
      },
      {
        id: 4,
        name: '排列5',
        issue: '20170228', shareTime: '01-05 12:27:31',
        awardAmount: 10000,
        current: 1,
        total: 10,
      },
      {
        id: 5,
        name: '七乐彩',
        issue: '20170228', shareTime: '01-05 12:27:31',
        awardAmount: 321300,
        current: 1,
        total: 10,
      },
      {
        id: 6,
        name: '七星彩',
        issue: '20170228', shareTime: '01-05 12:27:31',
        awardAmount: 45300,
        current: 1,
        total: 10,
      },
      {
        id: 7,
        name: '竞彩足球',
        issue: '20170228', shareTime: '01-05 12:27:31',
        awardAmount: 66500,
        current: 1,
        total: 10,
      },
      {
        id: 8,
        name: '竞彩篮球',
        issue: '20170228', shareTime: '01-05 12:27:31',
        awardAmount: 1232100,
        current: 1,
        total: 10,
      },
      {
        id: 9,
        name: '胜负彩',
        issue: '20170228', shareTime: '01-05 12:27:31',
        awardAmount: 7800,
        current: 1,
        total: 10,
      },
      {
        id: 10,
        name: '顶呱刮',
        issue: '20170228', shareTime: '01-05 12:27:31',
        awardAmount: 22000,
        current: 1,
        total: 10,
      },
      {
        id: 11,
        name: '3D福彩',
        issue: '20170228', shareTime: '01-05 12:27:31',
        awardAmount: 22000,
        current: 1,
        total: 10,
      },*/
      {
        id: 12,
        name: '刮刮乐',
        issue: '20170228', shareTime: '01-05 12:27:31',
        awardAmount: 22000,
        current: 1,
        total: 10,
        participator:[
          {
            name:'张三',
            percent:12,
            time:'2017-4-17'
          },
          {
            name:'李四',
            percent:30,
            time:'2017-04-7'
          },
          {
            name:'王五',
            percent:1,
            time:'2017-04-7'
          },
          {
            name:'赵六',
            percent:2,
            time:'2017-04-7'
          },
        ]
      },/*
      {
        id: 13,
        name: '任选9',
        issue: '20170228', shareTime: '01-05 12:27:31',
        awardAmount: 22000,
        current: 1,
        total: 10,
      }*/
    ];

    return { lotteries };
  }
}
