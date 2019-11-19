import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { FormsService } from 'src/app/services/forms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: Usuario = {};

  constructor( private usuarioService: UsuarioService,
               private uiService: UiServiceService,
               private formsService: FormsService) {}

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();

  }

  async actualizar( fActualizar: NgForm ) {

    if( fActualizar.invalid ) { return; }

    const actualizado = await this.usuarioService.actualizarUsuario( this.usuario );
    console.log(actualizado);

    if( actualizado ) {
      // toast con el mensaje de actualizado
      this.uiService.presentToast( 'updated user' );
    } else {
      // toast con el error
      this.uiService.presentToast( 'Could not update user' );

    }

  }

  logout() {

    this.formsService.paginaForms = 0;

    this.usuarioService.logout();

  }

}
