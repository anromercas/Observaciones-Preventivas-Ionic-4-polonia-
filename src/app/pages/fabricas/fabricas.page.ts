import { Component, OnInit, ViewChild } from '@angular/core';
import { Factory, Form, Pregunta } from '../interfaces/interfaces';
import { FactoryService } from '../../services/factory.service';
import { IonSegment, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UiServiceService } from '../../services/ui-service.service';
import { FormsService } from '../../services/forms.service';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-fabricas',
  templateUrl: './fabricas.page.html',
  styleUrls: ['./fabricas.page.scss'],
})
export class FabricasPage implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;

  factories: Factory[] = [];
  forms: Form[] = [];
  preguntas: Pregunta[] = [];
  mostrarFakeFactories = true;

  constructor(private factoryService: FactoryService,
              private actionSheetCtrl: ActionSheetController,
              private router: Router,
              private formService: FormsService,
              private questionService: QuestionService,
              private uiService: UiServiceService) {
                this.cargarFabricas();

              //  console.log(this.factories);
              }

  ngOnInit() {
    this.segment.value = 'factoryList';

  }

  cambioCategoria( event ) {

    console.log(event.detail.value);
    let categoria = event.detail.value;

    if ( categoria === 'factoryList') {
      this.factories = [];
      this.cargarFabricas();
      this.mostrarFakeFactories = true;
    } else if ( categoria === 'userHistory') {
      this.factories = [];
      this.cargarHistorialUsuario();
      this.mostrarFakeFactories = false;
    }

  }

  cargarFabricas() {
    this.factoryService.getFactories()
        .subscribe( (resp: any) => {
          this.factories.push( ...resp.factories );
        //  console.log(this.factories);
        },
        err => {
          this.router.navigate(['/login']);
          console.log(err);
        }
    );
  }

  cargarHistorialUsuario() {
    /* this.formService.getFormsByUser()
                    .then( (resp: any) => {
                      console.log(resp);
                      this.forms = resp;
                    }); */
  }

  async lanzarMenu() {

    const actionSheet = await this.actionSheetCtrl.create({

      mode: 'ios',
      buttons: [
        {
          text: 'Profile',
          icon: 'person',
          handler: () => {
            console.log('Profile');
            this.router.navigate(['/perfil']);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

}
