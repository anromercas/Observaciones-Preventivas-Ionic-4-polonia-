import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { environment } from 'src/environments/environment';
import { InitialObservation } from '../pages/interfaces/interfaces';
import { FormsService } from './forms.service';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class IobservationService {
  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private fileTransfer: FileTransfer
  ) {}


  getIObservations() {

    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });

    return new Promise( resolve => {
      this.http.get(`${ URL }/iobservation`, { headers })
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

  getIObservationsByIdForm( idForm: string ) {

    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });

    return new Promise( resolve => {
      this.http.get(`${ URL }/iobservation/byIdForm?idForm=${ idForm }`, { headers })
                .subscribe( async (resp: any) => {
                //  console.log(resp);
                  if( resp['ok']) {
                    resolve(resp.iObser);
                  } else {
                    resolve(false);
                  }
                });

    });

  }

  crearIObservation( iobservation: InitialObservation, formId: string) {
    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });
    return new Promise( resolve => {
      this.http.post(`${ URL }/iobservation?form=${ formId }`, iobservation, { headers } )
                .subscribe( async (resp: any) => {
                //  console.log(resp);
                  if ( resp['ok'] ) {
                    resolve(true);
                  } else {
                    resolve(false);
                  }
                });
    });
  }

  borrarIObservationsDeUnForm( idForm: string ) {
    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });

    return new Promise( resolve => {
      this.http.delete(`${ URL }/iobservation?idForm=${idForm}`, { headers })
                .subscribe( async resp => {
                //  console.log( 'iobservationservice - delete many', resp);
                  if( resp['ok'] ) {
                    resolve(true);
                  } else {
                    resolve(false);
                  }
                });
    });
  }

  subirImagenIobservation(img: string) {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        token: this.usuarioService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    return fileTransfer.upload(img, `${URL}/iobservation/upload`, options);
  }
}
