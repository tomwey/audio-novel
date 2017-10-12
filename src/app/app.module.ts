import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { CatalogPage } from '../pages/catalog/catalog';
import { PodcastPage } from '../pages/podcast/podcast';
import { SearchPage } from '../pages/search/search';
import { SettingPage } from '../pages/setting/setting';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CatalogPage,
    PodcastPage,
    SearchPage,
    SettingPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      // preloadModules: true,
      mode: 'ios',
      // backButtonText: '',
      tabsHideOnSubPages: true,
      // pageTransition: 'ios'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CatalogPage,
    PodcastPage,
    SearchPage,
    SettingPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
