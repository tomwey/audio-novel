import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CatalogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catalog',
  templateUrl: 'catalog.html',
})
export class CatalogPage {
  
  catalogList: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.catalogList = [
      {
        icon: 'assets/images/icon-1.jpg',
        name: '凡人修仙传',
        author: '大灰狼',
        state: '已完结：全集'
      },
      {
        icon: 'assets/images/icon-2.jpg',
        name: '仙逆',
        author: '朱宇',
        state: '已完结：全集'
      },
      {
        icon: 'assets/images/icon-3.jpg',
        name: '百炼成仙',
        author: '皖宣灿灿',
        state: '最新章节：连载4193集'
      },
    ];
  }

  showRecommended() {
    
  }

}
