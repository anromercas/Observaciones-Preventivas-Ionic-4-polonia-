import { Component, OnInit, Input } from '@angular/core';
import { Factory } from 'src/app/pages/interfaces/interfaces';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss'],
})
export class FactoryComponent implements OnInit {

  @Input() factory: Factory;

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

   imgUtrera = '../../assets/fabricas/utrera.jpg';
   imgPolonia = '../../assets/fabricas/poland.jpg';

  constructor(private router: Router) { }

  ngOnInit() {}

  viewFactory() {
    const navigationExtras: NavigationExtras = {
      state: {
        fabrica: this.factory
      }
    };
  //  console.log(navigationExtras);
    this.router.navigate(['/main/tabs/tab1'], navigationExtras);
  }

}
