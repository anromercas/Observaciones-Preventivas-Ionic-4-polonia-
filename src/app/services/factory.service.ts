import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Factory } from '../pages/interfaces/interfaces';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  factory: Factory;

  constructor(private http: HttpClient,
              private router: Router,
              private usuarioService: UsuarioService) { }

  getFactories() {

    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });

    return this.http.get(`${ URL }/factory/`, { headers })
                    .pipe(
                      map( (res) => res),
                      catchError( this.errorHandler )
                      );

  }

  errorHandler(error): Observable<any> {

    console.log(error);

    this.router.navigate(['/login']);

    return error;

  }
}
