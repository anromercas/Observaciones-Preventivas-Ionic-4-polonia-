import { Component, OnDestroy, AfterViewInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent implements  OnDestroy, AfterViewInit {

  backButtonSubscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      console.log('exit button');
      if( this.router.url === '/main/tabs/tab1' ) {
        navigator['app'].exitApp();
      } else if ( this.router.url === '/main/tabs/tab2' || this.router.url === '/main/tabs/tab3') {
        this.router.navigateByUrl('/main/tabs/tab1');
      } else {
        this.navCtrl.pop();
      }
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }


}
