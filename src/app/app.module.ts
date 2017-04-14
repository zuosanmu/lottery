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
import { LoginPage } from "../pages/login/login";
//加载组建
import { shuangseqiuComponent } from '../playRule/shuangseqiu/shuangseqiu.play';
import { daletouComponent } from '../playRule/daletou/daletou.play';
import { pailie3Component } from '../playRule/pailie3/pailie3.play';
import { pailie5Component } from '../playRule/pailie5/pailie5.play';
import { qilecaiComponent } from '../playRule/qilecai/qilecai.play';
import { qixingcaiComponent } from '../playRule/qixingcai/qixingcai.play';
import { jingcaizuqiuComponent } from '../playRule/jingcaizuqiu/jingcaizuqiu.play';
import { jingcailanqiuComponent } from '../playRule/jingcailanqiu/jingcailanqiu.play';
import { shengfucaiComponent } from '../playRule/shengfucai/shengfucai.play';
import { dingguaguaComponent } from '../playRule/dingguagua/dingguagua.play';
import { fucaiComponent } from '../playRule/fucai/fucai.play';
import { guagualeComponent } from '../playRule/guaguale/guaguale.play';
import { renxuanqiuComponent } from '../playRule/renxuanqiu/renxuanqiu.play';
//功能组建
import { sharesComponent } from '../playRule/shares/shares'
import { guagualeParticipantsComponent } from '../playRule/guaguale-participants/guaguale-participants'
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
    LoginPage,
    //功能组建
    sharesComponent,
    //组件加载
    shuangseqiuComponent,
    daletouComponent,
    pailie3Component,
    pailie5Component,
    qilecaiComponent,
    qixingcaiComponent,
    jingcaizuqiuComponent,
    jingcailanqiuComponent,
    shengfucaiComponent,
    dingguaguaComponent,
    fucaiComponent,
    guagualeComponent,
    renxuanqiuComponent
  ],
  imports: [
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon: 'arrow-back-outline',
      mode: 'ios'
    },{
      links:[
        {component: LoginPage, name: 'Login', segment: 'Login' }
      ]
    }
    ),
    // IonicPageModule.forChild(LoginPage,{}),
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
    LoginPage,
    //功能组建导入
    sharesComponent,
    //组建导入
    shuangseqiuComponent,
    daletouComponent,
    pailie3Component,
    pailie5Component,
    qilecaiComponent,
    qixingcaiComponent,
    jingcaizuqiuComponent,
    jingcailanqiuComponent,
    shengfucaiComponent,
    dingguaguaComponent,
    fucaiComponent,
    guagualeComponent,
    renxuanqiuComponent
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
