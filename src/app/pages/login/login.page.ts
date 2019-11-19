import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from 'src/app/pages/interfaces/interfaces';
import { USERSREGISTER } from '../../data/polonia/data.usersForRegister';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  loginUser = {
    email: 'user@mail.com',
    password: '1234'
  };

  registerUser: Usuario = {
    email: '',
    password: '',
    nombre: '',
    avatar: 'av-1.png',
    fabrica: null
  };

  usersRegister: Usuario[] = [];

  constructor( private usuarioService: UsuarioService,
               private navCtrl: NavController,
               private uiService: UiServiceService ) { }

  ngOnInit() {
    this.slides.lockSwipes(true);

    this.usersRegister = USERSREGISTER;
  }

  async login(fLogin: NgForm) {
    if ( fLogin.invalid ) { return; }

    const valido = await this.usuarioService.login( this.loginUser.email, this.loginUser.password );

    if ( valido ) {
      // navegar al tabs
    //  this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
        this.navCtrl.navigateRoot( '/fabricas', { animated: true } );

    } else {
      // mostrar alerta de usuario y pass no correctos
      this.uiService.alertaInformativa('Usuario y contraseña no son correctos.');
    }
  }

  async registro( fRegistro: NgForm ) {

    if ( fRegistro.invalid ) {
      this.uiService.presentToast('invalid fields');
      return;
    }

    this.usersRegister.forEach(user => {
      if (user.email === this.registerUser.email) {
        this.registerUser.fabrica = user.fabrica;
        this.registerUser.idioma = user.idioma;
      }
    });

    const valido = await this.usuarioService.registro( this.registerUser );
    if ( valido ) {
      // navegar al login
      this.navCtrl.navigateRoot( '/fabricas', { animated: true } );
    } else {
      // mostrar alerta de usuario y pass no correctos
      this.uiService.alertaInformativa('Invalid User - contact the administrator to create a user with that email');
    }

  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}
