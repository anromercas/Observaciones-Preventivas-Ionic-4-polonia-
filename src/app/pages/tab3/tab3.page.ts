import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/pages/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';
import { FormsService } from '../../services/forms.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {


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
