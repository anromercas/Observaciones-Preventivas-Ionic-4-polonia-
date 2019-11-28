import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaForms, Form } from '../pages/interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { QuestionService } from './question.service';
import { IobservationService } from './iobservation.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  paginaForms = 0;
  form: Form;

  nuevoForm = new EventEmitter<Form>();
  deleteForm = new EventEmitter<Form>();

  constructor( private http: HttpClient,
               private usuarioService: UsuarioService,
               private fileTransfer: FileTransfer,
               private questionService: QuestionService,
               private iobservationService: IobservationService ) { }



  getForms( pull: boolean = false, fabrica?: string) {

    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });

    if ( pull ) {
      this.paginaForms = 0;
    }

    this.paginaForms ++;

    return this.http.get<RespuestaForms>(`${ URL }/form/?pagina=${ this.paginaForms }&fabrica=${fabrica}`, { headers });
  }

  getFormById( idForm: string ) {
    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });

    return new Promise( resolve => {
      this.http.get<RespuestaForms>(`${ URL }/form/getForm?idForm=${ idForm }`, { headers })
                                  .subscribe( async resp => {
                                    resolve(resp);
                                  });
    });
  }

  getFormsByUser() {
    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });

    return new Promise( resolve => {
      this.http.get<RespuestaForms>(`${ URL }/form/getFormsByUser`, { headers })
                                  .subscribe( async (resp: any) => {
                                    resolve(resp.form);
                                  });
    });
  }

  crearForm( form ) {

    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });

    return new Promise( resolve => {
      this.http.post(`${ URL }/form`, form, { headers })
              .subscribe( (resp: any) => {
              //  console.log('Crear Form', resp);
                this.form = resp.form;
              //  console.log(resp.form._id);
                this.nuevoForm.emit( resp['form'] );
                resolve(true);
              });
    });
  }


  subirImagen( img: string ) {

    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'token': this.usuarioService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    return fileTransfer.upload( img, `${ URL }/question/upload`, options );

  }

  borrarUltimo(id?: string) {
    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });

    const idForm = this.form._id || id;

    return new Promise( resolve => {
      this.http.delete(`${ URL }/form/?idForm=${ idForm }`, { headers })
              .subscribe( (resp: any) => {
              //  console.log(resp);
                if( resp['ok']) {
                  this.deleteForm.emit( resp['form'] );
                  // borrar las preguntas y los initial observations asociadas a este form si las hubiera
                  this.questionService.borrarPreguntasDeUnForm( idForm );
                  this.iobservationService.borrarIObservationsDeUnForm( idForm );
                //  console.log('FormService - Delete form', resp);
                  this.form = resp;
                  resolve(true);
                } else {
                  resolve(false);
                }
              });
    });
  }
}
