import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad {

  constructor( private usuarioService: UsuarioService ) {

  }

  canLoad() {
    return this.usuarioService.validaToken();
  }


}
