import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  requestParams: any = { server: '服务器4', category: '都市传说', order: '点击排行', page: 1, ungz: 1 };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private books: BooksService,
    private tool:  ToolService,
    ) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  gotoBook(book): void {
    this.navCtrl.push('BookPage', book);
  }

  loadData(): Promise<any> {
    if (this.requestParams.page === 1) {
      this.tool.showLoading('加载中...');
    }
    console.log(`page:${this.requestParams.page}`);

    return new Promise(resolve => {
      this.books.getCategories(this.requestParams)
      .then(data => {
        console.log(data);
        // alert(data);
        if (this.requestParams.page === 1) {
          this.catalogList = data.bookArr;
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
    
  }

}
