import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Pregunta, Form } from '../interfaces/interfaces';
import { FormsService } from 'src/app/services/forms.service';
import { Router } from '@angular/router';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { QuestionService } from 'src/app/services/question.service';
import { SERVICES } from '../../data/data.services';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PuedeDesactivar } from '../../guards/salir-ruta.guard';

declare var window: any;


@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit, PuedeDesactivar {

  @ViewChild('slideServices') slides: IonSlides;

  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 40,
    watchSlidesProgress: true
  };


  imgAvatar = '../assets/avatar-iturri/avatar-services.png';

  preguntasOk = false;
  preguntas: Pregunta[] = [];
  tempImages: string[] = [];

  isEnd = false;
  tamSlide: number;

  form: Form = {
    area: 'Offices',
  };

  constructor(private formService: FormsService,
              private route: Router,
              private camera: Camera,
              private uiService: UiServiceService,
              private questionService: QuestionService) { }

  ngOnInit() {
    // bloquear slide
    this.slides.lockSwipes(true);

    this.preguntas = SERVICES;

    this.crearForm();
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

  camara( pregunta ) {

    console.log( pregunta );

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     const img = window.Ionic.WebView.convertFileSrc( imageData );
     console.log(img);

     this.formService.subirImagen( imageData );

     this.tempImages.push( img );
     pregunta.img.push( imageData );

     console.log( pregunta );
    }, (err) => {
     // Handle error
     console.log(err);
    });

  }

  checkValue( event, pregunta ) {
    if ( event === 'yes') {
      // seleccionar true en ok
     pregunta.ok = true;
     pregunta.color = 'success';
    } else {
      // seleccionar false en ok
      pregunta.ok = false;
      pregunta.color = 'danger';
    }

    let cont = 0;
    this.preguntas.forEach( pregunta => {
      // si hay pregunta.ok con null es que falta por responder
      cont ++;
      let preguntaNull = true;
      if ( pregunta.ok === null ) {
        preguntaNull = false;
        return;
      } else if ( cont === this.preguntas.length && preguntaNull === true ) {
        this.preguntasOk = true;
      }
    });

  }

  resetForm() {
     this.preguntas.forEach( preg => {
       preg.ok = null;
       preg.color = '';
       preg.img = [];
       preg.comentario = '';
     });
  }

  async crearForm() {

    const creado = await this.formService.crearForm( this.form );

    if (creado) {
    //  this.uiService.alertaInformativa('Form Saved!');
    //  this.route.navigateByUrl('/main/tabs/tab2');
    //  this.resetForm();
    //  this.tempImages = [];
    console.log('Formulario creado');
    } else {
      this.uiService.presentToast('The form has not been created, check your internet connection');
      this.route.navigateByUrl('/main/tabs/tab2');
    }

  }

  finish() {
    this.uiService.presentToast('Form Saved!');
    this.route.navigateByUrl('/main/tabs/tab2');
    this.resetForm();
    this.tempImages = [];
  }

  async next( pregunta: Pregunta ) {

    // comprobar que se ha seleccionado una opcion en la pregunta ( yes / no )
    if ( pregunta.ok === null ) {
      this.uiService.alertaInformativa('You have to select an option <strong> (Yes / No) </strong> ');
    } else {

      this.slides.isEnd().then( isEnd => {
        if ( isEnd ) {
          this.isEnd = true;
          this.uiService.alertaInformativa('No more questions, Now you can save the form!');
        }
      });


      // desbloquear slide
      this.slides.lockSwipes(false);
      // mover al slide siguiente
      this.slides.slideNext();
      // bloquear slide
      this.slides.lockSwipes(true);

      // crear la pregunta
      const form = this.formService.form;

      this.questionService.crearQuestion(pregunta, form._id)
                          .subscribe( resp => {
                            console.log(resp);
                          });
    }

  }

}
