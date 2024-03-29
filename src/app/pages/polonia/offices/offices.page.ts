import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { QuestionService } from 'src/app/services/question.service';
import { FormsService } from 'src/app/services/forms.service';
import { IonSlides, LoadingController } from '@ionic/angular';
import { Pregunta, Form, InitialObservation } from '../../interfaces/interfaces';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PuedeDesactivar } from '../../../guards/salir-ruta.guard';
import { OFFICES } from '../../../data/polonia/data.offices';
import { FactoryService } from 'src/app/services/factory.service';
import { IobservationService } from 'src/app/services/iobservation.service';
import { OFFICERISKS } from 'src/app/data/polonia/data.officerisks';

declare var window: any;

@Component({
  selector: 'app-offices',
  templateUrl: './offices.page.html',
  styleUrls: ['./offices.page.scss'],
})
export class OfficesPage implements OnInit, PuedeDesactivar {

  @ViewChild('slideOffices') slides: IonSlides;

  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 40,
    watchSlidesProgress: true
  };

  loading: any;

  imgAvatar = '../assets/avatar-iturri/avatar.jpg';

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

  constructor(private formService: FormsService,
              private factoryService: FactoryService,
              private route: Router,
              private camera: Camera,
              private uiService: UiServiceService,
              private questionService: QuestionService,
              private iObservationService: IobservationService,
              public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.form  = {
      area: 'Offices',
      fabrica: this.factoryService.factory
    };

    this.crearForm();
    // bloquear slide
    this.slides.lockSwipes(true);

    this.preguntas = OFFICES;
    this.risks = OFFICERISKS;

    this.iniciarIObservation();
  }

  permitirSalirDeRuta(): boolean | Promise<boolean> | import('rxjs').Observable<boolean> {
    if ( this.isEnd ) {
      return true;
    }

    const confirmacion = window.confirm( 'Will lose this data. Are you sure?');
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
}
