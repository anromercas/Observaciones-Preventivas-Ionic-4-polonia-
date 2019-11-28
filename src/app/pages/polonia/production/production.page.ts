import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Pregunta,
  Form,
  InitialObservation
} from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { IonSlides, IonContent, LoadingController } from '@ionic/angular';
import { PuedeDesactivar } from '../../../guards/salir-ruta.guard';
import { FormsService } from '../../../services/forms.service';
import { PRODUCTION } from '../../../data/polonia/data.production';
import { FactoryService } from '../../../services/factory.service';
import { PRODUCTIONRISKS } from '../../../data/polonia/data.productionrisks';
import { IobservationService } from '../../../services/iobservation.service';
import { QuestionService } from '../../../services/question.service';

declare var window: any;

@Component({
  selector: 'app-production',
  templateUrl: './production.page.html',
  styleUrls: ['./production.page.scss']
})
export class ProductionPage implements OnInit, PuedeDesactivar {
  @ViewChild('slideProduction') slides: IonSlides;
  @ViewChild(IonContent) content: IonContent;

  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 40,
    watchSlidesProgress: true
  };

  loading: any;

  imgAvatar = '../../assets/avatar-iturri/avatar-produccion.png';

  preguntasOk = false;
  preguntas: Pregunta[] = [];
  risks: any[] = [];

  isEnd = false;
  tamSlide: number;

  iObservation: InitialObservation[];

  iObservComponents: any = [
    {
      select: false,
      queVes: false,
      camera: true
    },
    {
      select: true,
      queVes: true,
      camera: true
    },
    {
      select: true,
      queVes: true,
      camera: true
    }
  ];

  form: Form;

  constructor(
    private formService: FormsService,
    private factoryService: FactoryService,
    private route: Router,
    private camera: Camera,
    private uiService: UiServiceService,
    private questionService: QuestionService,
    private iObservationService: IobservationService,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.form = {
      area: 'Production',
      fabrica: this.factoryService.factory
    };
    this.crearForm();

    // bloquear slide
    this.slides.lockSwipes(true);

    this.preguntas = PRODUCTION;
    this.risks = PRODUCTIONRISKS;

    this.iniciarIObservation();
  }

  permitirSalirDeRuta():
    | boolean
    | Promise<boolean>
    | import('rxjs').Observable<boolean> {
    if (this.isEnd) {
      return true;
    }

    const confirmacion = window.confirm('Will lose this data. Are you sure?');
    if (confirmacion) {
      this.formService.borrarUltimo();
      this.resetForm();
    }
    return confirmacion;
  }

  camara(pregunta, index) {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.camera.getPicture(options).then(
      imageData => {

        this.formService
          .subirImagen(imageData)
          .then(async data => {
            console.log(data);

            // Bloqueo la pregunta actual
            pregunta.radioDisabled = true;
            pregunta.camaraDisabled = true;
            // Desbloqueo la pregunta siguiente
            if (index !== 8) {
              this.preguntas[index + 1].radioDisabled = false;
            }

            if (index === 8) {
              console.log('ultimo boton');
              this.loading = await this.loadingCtrl.create({
                message: 'Saving...',
                spinner: 'bubbles',
                duration: 2000
              });
              await this.loading.present();
              // aqui el codigo para salir del formulario y resetear el formulario
              this.isEnd = true;
              this.resetForm();
              this.uiService.presentToastMiddle('Form Saved!');
              this.route.navigateByUrl('/main/tabs/tab2');
            }

            const form = this.formService.form;
            this.questionService.crearQuestion(pregunta, form._id)
                                .subscribe( resp => {
                                  console.log(resp);
                                  if ( index === 8 ) {
                                    this.loading.dismiss();
                                  }
                                });
          })
          .catch(err => {
            console.log('Error en carga', err);
          });
      },
      err => {
        // Handle error
        console.log(err);
      }
    );
  }

  cameraIObserv(index) {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.camera.getPicture(options).then(
      imageData => {

        this.iObservationService
          .subirImagenIobservation(imageData)
          .then(async data => {
            // AQUI VA EL SWITCH

            switch (index) {
              case 1:
                this.iObservComponents[1].select = false;
                this.iObservComponents[1].queVes = false;
                this.iObservComponents[0].select = true;
                this.iObservComponents[0].camera = true;
                this.iObservComponents[0].queVes = true;

                break;
              case 2:
                this.iObservComponents[2].select = false;
                this.iObservComponents[2].queVes = false;
                this.iObservComponents[1].select = true;
                this.iObservComponents[1].camera = true;
                this.iObservComponents[1].queVes = true;
                break;
              case 3:
                console.log(this.iObservation);

                // desbloquear slide
                this.slides.lockSwipes(false);
                // mover al slide siguiente
                this.slides.slideNext();
                // bloquear slide
                this.slides.lockSwipes(true);
                // subir al principio de las preguntas
                this.ScrollToPoint(0, 1001);
                break;
            }
            // creo la initial observation
            const creado = await this.iObservationService.crearIObservation(
              this.iObservation[index - 1],
              this.formService.form._id
            );
            /* if (creado) {
              this.uiService.presentToastMiddle('Initial observation creada');
            } */
          });

      },
      err => {
        // Handle error
        console.log(err);
      }
    );
  }

  checkInitialObserv(event, pregunta) {
    console.log(event);
    console.log(pregunta);

    switch (pregunta) {
      case 1:
        this.iObservation[0].tipoRiesgo = event;
        this.iObservComponents[0].camera = false;
        break;
      case 2:
        this.iObservation[1].tipoRiesgo = event;
        this.iObservComponents[1].camera = false;
        break;
      case 3:
        this.iObservation[2].tipoRiesgo = event;
        this.iObservComponents[2].camera = false;
        break;
    }
  }

  radioSelect(pregunta, value) {
    console.log(pregunta, value);

    pregunta.camaraDisabled = false;

    if (value === 'yes') {
      // seleccionar true en ok
      pregunta.ok = true;
      pregunta.color = 'success';
    } else {
      // seleccionar false en ok
      pregunta.ok = false;
      pregunta.color = 'danger';
    }
  }

  resetForm() {
    this.preguntas.forEach(preg => {
      preg.ok = null;
      preg.color = '';
      preg.img = [];
      preg.comentario = '';
      preg.camaraDisabled = true;
      if ( preg.texto === 'Work clothing and footwear' ) {
        preg.radioDisabled = false;
      } else {
        preg.radioDisabled = false;
      }
    });
    this.iniciarIObservation();
  }

  async crearForm() {
    const creado = await this.formService.crearForm(this.form);

    if (creado) {

      console.log('Formulario creado');
    } else {
      this.uiService.presentToast(
        'The form has not been created, check your internet connection'
      );
      this.route.navigateByUrl('/main/tabs/tab2');
    }
  }

  iniciarIObservation() {
    this.iObservation = [
      {
        queVes: '',
        tipoRiesgo: '',
        img: '',
        form: null
      },
      {
        queVes: '',
        tipoRiesgo: '',
        img: '',
        form: null
      },
      {
        queVes: '',
        tipoRiesgo: '',
        img: '',
        form: null
      }
    ];
  }

  /* logScrolling( event ) {
    console.log('logScrolling : When Scrolling');
    console.log(event);
  } */

  ScrollToPoint(X,Y){
    this.content.scrollToPoint(X,Y,1500);
  }

}
