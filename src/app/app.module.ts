import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../mock/in-memory-data.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//引用的服务
import { LotteryService } from '../service/lottery.service';
import { BallService } from '../service/ball.service';
//加载页面
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';
import { DaletouPage } from '../pages/daletou/daletou';
import { DingguaguaPage } from '../pages/dingguagua/dingguagua';
import { JingcailanqiuPage } from '../pages/jingcailanqiu/jingcailanqiu';
import { JingcaizuqiuPage } from '../pages/jingcaizuqiu/jingcaizuqiu';
import { Pailie3Page } from '../pages/pailie3/pailie3';
import { Pailie5Page } from '../pages/pailie5/pailie5';
import { QilecaiPage } from '../pages/qilecai/qilecai';
import { QixingcaiPage } from '../pages/qixingcai/qixingcai';
import { RenxuanqiuPage } from '../pages/renxuanqiu/renxuanqiu';
import { ShengfucaiPage } from '../pages/shengfucai/shengfucai';
import { ShuangseqiuPage } from '../pages/shuangseqiu/shuangseqiu';
import { FucaiPage } from '../pages/fucai/fucai';
import { GuagualePage } from '../pages/guaguale/guaguale';
import { RedEnvelopePage } from '../pages/red-envelope/red-envelope';
//加载组建
import { shuangseqiuComponent } from '../playRule/shuangseqiu/shuangseqiu.play';
import {sharesComponent} from '../playRule/shares/shares'
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    DaletouPage,
    DingguaguaPage,
    JingcailanqiuPage,
    JingcaizuqiuPage,
    Pailie3Page,
    Pailie5Page,
    QilecaiPage,
    QixingcaiPage,
    RenxuanqiuPage,
    ShengfucaiPage,
    ShuangseqiuPage,
    FucaiPage,
    GuagualePage,
    RedEnvelopePage,
    shuangseqiuComponent,
    sharesComponent
  ],
  imports: [
    HttpModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      backButtonIcon:'arrow-back-outline',
      mode:'ios'
    }, {}
  ),
    InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    DaletouPage,
    DingguaguaPage,
    JingcailanqiuPage,
    JingcaizuqiuPage,
    Pailie3Page,
    Pailie5Page,
    QilecaiPage,
    QixingcaiPage,
    RenxuanqiuPage,
    ShengfucaiPage,
    ShuangseqiuPage,
    FucaiPage,
    GuagualePage,
    RedEnvelopePage,
    shuangseqiuComponent,
    sharesComponent
  ],
  providers: [
    BallService,
    LotteryService,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
