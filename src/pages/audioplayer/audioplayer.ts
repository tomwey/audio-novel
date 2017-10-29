import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ITrackConstraint } from '../../components/audio-player/ionic-audio-interfaces';
import { ApiService } from '../../providers/api-service';
import { ToolService } from '../../providers/tool-service';
/**
 * Generated class for the AudioplayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-audioplayer',
  templateUrl: 'audioplayer.html',
})
export class AudioplayerPage {

  currentTrack: ITrackConstraint;
  bookdatas: any = [];
  paramData :any;
  requestParams: any = { 
      openID:"e47d16be01ae009dbcdf696e62f9c1ecd5da4559",//设备唯一标识，可随意填一个
      isPlay : "1",
      chapterID : "ccc51fbfe2b4f5d2fd7804d0ba3d0083",
      chapterTitle : "[第003集]",
      title : "借命",
      chapterjs : "",
      chapterHref : "http:\/\/www.ysts8.com\/Yshtml\/Ys22483.html?vid=AGJ6AWV7BnFdNDUoNWZ4ATQqATB7LGAoMqQnLDNcADMpMDIsMWF8LJ7,,url=http:\/\/www.ysts8.com\/down_22483_50_1_3.html",
      chapterServer : "44c29edb103a2872f519ad0c9a0fdaaa",
      ID : "41f33a237e4af3435ba53c3d308a8cdf",
      ungz: 1
  };
  
  constructor(public navCtrl: NavController, public navParams: NavParams,  private api: ApiService,
    private tool: ToolService,) {
    this.paramData = this.navParams.data;
      console.log(this.paramData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AudioplayerPage');
    this.requestParams.ID = this.paramData.bookitem.ID;
    this.requestParams.openID = this.paramData.bookitem.openID;
    this.requestParams.chapterjs = this.paramData.bookitem.chapterjs;
    this.requestParams.title = this.paramData.bookitem.title;
    this.requestParams.chapterID = this.paramData.item.chapterID;
    this.requestParams.chapterTitle = this.paramData.item.chapterTitle;
    this.requestParams.chapterHref = this.paramData.item.chapterHref;
    this.requestParams.chapterServer = this.paramData.item.chapterServer;
    
    this.loadAudioData()
    console.log("加载数据！！！");
  }

  loadAudioData(): Promise<any> {
    return new Promise((resolve => {
      this.tool.showLoading('加载中...');
      this.api.get('you/getChapter.php', this.requestParams)
        .then(data => {
          this.tool.hideLoading();
          console.log(data);
          
          this.currentTrack = {
            src: "http://m128.xiami.net/812/634530812/2100366979/1776261604_60412020_l.mp3?auth_key=1509850800-0-0-8e75598b315ad6bd2d35bb4a6ef8831d",//data.chapterSrcArr[0],
            artist: data.title,
            title: data.chapterTitle,
            art: this.paramData.bookitem.src,
            preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
          }
          resolve(true);
        })
        .catch(error => {
          this.tool.hideLoading();
          resolve(false);
        })
    }));
  }

}
