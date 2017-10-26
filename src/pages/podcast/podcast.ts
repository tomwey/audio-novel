import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { PodCastsService } from "../../providers/podcast-service";
import { ToolService } from "../../providers/tool-service";

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
  hasMore: boolean = true;

  requestParams: any = { "openID":"e47d16be01ae009dbcdf696e62f9c1ecd5da4559", "page": 1, "ungz":1};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private podcasts: PodCastsService,
    private tool:  ToolService,
    private app: App,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PodcastPage');
    this.loadData();
  }

  loadData(): Promise<any> {
    if (this.requestParams.page === 1) {
      this.tool.showLoading('加载中...');
    }
    console.log(`page:${this.requestParams.page}`);

    return new Promise(resolve => {
      this.podcasts.getCategories(this.requestParams)
      .then(data => {
        console.log(data);
        // alert(data);
        data.bookArr.forEach(function (e) {
            var src = 'assets/images/icon-1.jpg,,'+e.src
            var splits = src.split(',,', 3)
            e.src = splits[splits.length - 1]
            if (e.src == 'undefined') {
              e.src = 'assets/images/icon-1.jpg'
            }           
        });
        if (this.requestParams.page === 1) {
          this.dataList = data.bookArr;
        } else {
          let temp = this.dataList || [];
          this.dataList = temp.concat(data.bookArr);
        }
        // console.log(this.dataList.length);

        this.hasMore = true

        resolve(true);

        this.tool.hideLoading();
      })
      .catch(error => {
        console.log(error);
        // alert(error);
        resolve(false);

        this.tool.hideLoading();
      });
    });
  }

  doRefresh(e): void {
    this.requestParams.page = 1;
    console.log("刷新界面")
    this.loadData()
      .then(data => {
        e.complete();
      });
  }

  doInfinite(e): void {
    console.log("刷新界面")
    this.requestParams.page ++;
    this.loadData()
      .then(data => {
        e.complete();
      });
  }

  gotoPodcast(item): void{
    if (item.href == null){
      item.href = item.chapterUrlArr[0]
    }
    this.app.getRootNavs()[0].push('PodcastDetailPage', { 
      title: item.title,
      url: item.href});
  }

  showRecommended() {
    this.app.getRootNavs()[0].push('RecommendPage', { server: '推荐', category: '电台', order: '' });
  }

}
