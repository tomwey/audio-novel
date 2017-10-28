import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { BooksService } from "../../providers/books-service";
import { ToolService } from "../../providers/tool-service";

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
  hasMore: boolean = true;
  filterDic: any = null;

  // loading: boolean = false;
  firstLoaded: boolean = false;

  orders: any = [];
  servers: any = [];
  categories: any = [];

  serverCategories: any = {};

  requestParams: any = { server: '', category: '', order: '', page: 1, ungz: 1 };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private books: BooksService,
    private tool:  ToolService,
    private app: App,
    ) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  gotoBook(book): void {
    this.app.getRootNavs()[0].push('BookPage', book);
  }

  getCategories(server): void {
    for (var key in this.serverCategories) {
      // console.log(key);
      // console.log(server);
      if (key === server) {
        // console.log(111);
        this.categories = this.serverCategories[key];
        // console.log(this.categories);
        this.requestParams.category = this.categories[0];
        // console.log(this.requestParams.category);
        break;
      }
    }
  }

  fetchData(ev): void {
    // console.log(this.requestParams.order);
    // console.log(this.requestParams.server);
    // console.log(this.requestParams.category);
    // if (!this.firstLoad) {
      this.requestParams.page = 1;
      this.loadData();
    // }

  }

  loadData(): Promise<any> {
    return new Promise(resolve => {
      // if (this.loading) {
      //   resolve(false);
      //   return;
      // }

      // this.loading = true;
      if (this.requestParams.page === 1) {
        this.tool.showLoading('加载中...');
      }

      this.books.getCategories(this.requestParams)
      .then(data => {
        console.log(data);
        // alert(data);
        if (this.requestParams.page === 1) {
          this.catalogList = data.bookArr;

          this.filterDic = data.filterDic;

          // this.prepareFilterData();
          if (!this.firstLoaded) {
            this.firstLoaded = true;
            this.prepareFilterData();
          }
        } else {
          let temp = this.catalogList || [];
          this.catalogList = temp.concat(data.bookArr);
        }
        // console.log(this.catalogList.length);

        this.hasMore = data.bookArr.length == 88;

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

  prepareFilterData() {
    let order = this.filterDic.order;
    let arr: any = [];
    for (let i in order) {
      arr.push(i);
    }
    this.orders = arr;
    this.requestParams.order = arr[0];

    let serverCategory = this.filterDic.server_category;
    let arr2 = [];
    for (let server in serverCategory) {
      arr2.push(server);
      var arr3 = [];
      let obj = serverCategory[server];

      for (var key in obj['category']) {
        arr3.push(key);
      }

      this.serverCategories[server] = arr3;
    }

    this.servers = arr2;
    this.requestParams.server = arr2[0];
    // this.getCategories(arr2[0]);
  }

  doRefresh(e): void {
    this.requestParams.page = 1;

    this.loadData()
      .then(data => {
        e.complete();
      });
  }

  doInfinite(e): void {
    this.requestParams.page ++;
    this.loadData()
      .then(data => {
        e.complete();
      });
  }

  showRecommended() {
    this.app.getRootNavs()[0].push('RecommendPage', { server: '推荐', category: '分类', order: '' });
  }

}
