import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PodcastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-podcast',
  templateUrl: 'podcast.html',
})
export class PodcastPage {

  dataList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PodcastPage');
    this.dataList = [
      {
        icon: 'assets/images/icon-1.jpg',
        name: 'CNR中国交通广播',
        desc: ''
      },
      {
        icon: 'assets/images/icon-2.jpg',
        name: 'CNR中国之声',
        desc: ''
      },
      {
        icon: 'assets/images/icon-3.jpg',
        name: 'CNR经济之声',
        desc: ''
      },
    ];
  }

  showRecommended() {
    
  }

}
