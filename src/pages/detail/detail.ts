import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { BallService } from '../../service/ball.service';
/*
  Generated class for the Detail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  private lottery;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController) {
    this.lottery = this.navParams.get('page');
  }
  presentActionSheet() {
   let actionSheet = this.actionSheetCtrl.create({
     title: '你的彩店数已达到上限,请删除一个',
     buttons: [
       {
         text: '胖哥1店',
         handler: () => {
           console.log('删除胖哥1店');
         }
       },
       {
         text: '胖哥2店',
         handler: () => {
           console.log('删除胖哥1店');
         }
       },
       {
         text: '胖哥3店',
         handler: () => {
           console.log('删除胖哥1店');
         }
       },
       {
         text: '胖哥4店',
         handler: () => {
           console.log('删除胖哥1店');
         }
       },
       {
         text: '取消',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
