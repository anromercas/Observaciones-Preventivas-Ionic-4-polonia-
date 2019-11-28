import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Pregunta, RespuestaQuestions } from '../pages/interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(  private http: HttpClient,
                private usuarioService: UsuarioService,
                private fileTransfer: FileTransfer  ) { }



  getQuestionById( idQuestion: string ) {

    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });

    return new Promise( resolve => {
      this.http.get(`${ URL }/question/getQuestion?idQuestion=${ idQuestion }`, { headers })
                .subscribe( async (resp: any) => {
                //  console.log(resp);
                  if( resp['ok']) {
                    resolve(resp.pregunta);
                  } else {
                    resolve(false);
                  }
                });

    });

  }


  getQuestionByIdForm( idForm: string ) {
    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });

    return this.http.get<RespuestaQuestions>(`${ URL }/question/getQuestions?idForm=${ idForm }`, { headers });
  }

  crearQuestion( pregunta: Pregunta, formId: string ) {
    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });
    return this.http.post(`${ URL }/question/?form=${ formId }`, pregunta, { headers });
  }

  modificarQuestion( pregunta: Pregunta ) {
    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });

    return new Promise( resolve => {
      this.http.post(`${ URL }/question/update`, pregunta, { headers })
                .subscribe( async resp => {
                  if( resp['ok'] ) {
                    resolve(true);
                  } else {
                    resolve(false);
                  }
                });
    });
  }

  borrarPreguntasDeUnForm( idForm: string ) {
    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });

    return new Promise( resolve => {
      this.http.delete(`${ URL }/question?idForm=${idForm}`, { headers })
                .subscribe( async resp => {
                //  console.log( 'questionService - delete many', resp);
                  if( resp['ok'] ) {
                    resolve(true);
                  } else {
                    resolve(false);
                  }
                });
    });
  }

}
