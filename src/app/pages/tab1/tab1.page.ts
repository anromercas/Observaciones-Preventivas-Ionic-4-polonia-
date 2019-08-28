import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../services/forms.service';
import { Form, Pregunta } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  forms: Form[] = [];
  preguntas: Pregunta[] = [];

  habilitado = true;

  constructor( private formsService: FormsService ) {}

  ngOnInit() {

    this.siguientes();

    this.formsService.nuevoForm
                    .subscribe( form => {
                      this.forms.unshift(form);
                    });
    this.formsService.deleteForm
                      .subscribe( form => {
                        this.forms.shift();
                      });
  }

  recargar( event ) {

    this.siguientes( event, true);
    this.habilitado = true;
    this.forms = [];
    this.completeRefresh(event);
  }

  siguientes( event?, pull: boolean = false ) {

    this.formsService.getForms( pull )
    .subscribe( resp => {
      console.log(resp);
      this.forms.push( ...resp.forms );

      if( event ) {
        event.target.complete();
        if ( resp.forms.length === 0 ) {
          this.habilitado = false;
        }
      }
    });

  }

  completeRefresh(event) {
    event.target.disabled = true;
//    event.target.complete();
    setTimeout(() => {
      event.target.disabled = false;
    }, 100);
  }

}
