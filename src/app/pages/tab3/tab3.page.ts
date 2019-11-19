import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/pages/interfaces/interfaces';
import { ViewQuestionPage } from '../view-question/view-question.page';
import { ModalController } from '@ionic/angular';
import { INFO } from '../../data/polonia/data.info';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {


  usuario: Usuario = {};
  info: any[] = [];

  constructor( private modalCtrl: ModalController,) {
                this.info = INFO;
               }

  ngOnInit() {
  }

  mostrarImg() {
    console.log('mostrar img');
  }

  async verImg( img: string ) {
    console.log(img);

    const modal = await this.modalCtrl.create({
      component: ViewQuestionPage,
      componentProps: {
        'img': img
      }
    });

    await modal.present();
  }
}
