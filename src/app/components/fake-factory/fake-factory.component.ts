import { Component, OnInit, Input } from '@angular/core';
import { Factory } from '../../pages/interfaces/interfaces';


@Component({
  selector: 'app-fake-factory',
  templateUrl: './fake-factory.component.html',
  styleUrls: ['./fake-factory.component.scss'],
})
export class FakeFactoryComponent implements OnInit {

  @Input() factory: Factory;

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

  imgAlemania = '../../assets/fabricas/alemania.jpg';
  imgMadrid = '../../assets/fabricas/madrid.jpg';
  imgBrasil = '../../assets/fabricas/brasil.jpg';
  imgPortugal = '../../assets/fabricas/portugal.jpg';
  imgFrancia = '../../assets/fabricas/francia.jpg';

  constructor() { }

  ngOnInit() { }

}
