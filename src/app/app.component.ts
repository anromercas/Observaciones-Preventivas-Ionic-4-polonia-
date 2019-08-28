import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { UiServiceService } from './services/ui-service.service';
import { OfficesPage } from './pages/offices/offices.page';
import { PuedeDesactivar } from './guards/salir-ruta.guard';
import { MagazinePage } from './pages/magazine/magazine.page';
import { ProductionPage } from './pages/production/production.page';
import { ServicesPage } from './pages/services/services.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent implements PuedeDesactivar {

  backButtonSubscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private navCtrl: NavController,
    private offices: OfficesPage,
    private magazine: MagazinePage,
    private production: ProductionPage,
    private services: ServicesPage
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

  permitirSalirDeRuta(): boolean | Promise<boolean> | import('rxjs').Observable<boolean> {

    switch (this.router.url) {
      case '/production':
        console.log('procuction desde app component');
        if ( this.production.isEnd ) {
          return true;
        }
      break;

      case '/magazine':
        console.log('magazine desde app component');
        if ( this.magazine.isEnd ) {
          return true;
        }
      break;

      case '/services':
        console.log('services desde app component');
        if ( this.services.isEnd ) {
          return true;
        }
      break;

      case '/offices':
        console.log('offices desde app component');
        if ( this.offices.isEnd ) {
          return true;
        }
      break;

      case '/main/tabs/tab1':
        
      break;

      case '/main/tabs/tab2':
        navigator['app'].exitApp();
      break;

      case '/main/tabs/tab3':
        navigator['app'].exitApp();
      break;

    }

    const confirmacion = window.confirm( 'Will lose this data. Are you sure?');
    return confirmacion;
  }

}
